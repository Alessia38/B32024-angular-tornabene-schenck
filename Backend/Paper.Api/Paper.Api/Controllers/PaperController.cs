using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Paper.Api.Models;
using Paper.Api.Services;
using System.Numerics;

namespace Paper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperController : ControllerBase
    {

        public PaperController(PaperDbContext context)
        {
            _context = context;
        }
        private static int MaxId = 0;
        private static List<PaperModel> PaperList = new()
        {
            new PaperModel { Id = 1, Name = "Papier 1", Texture = "Lisse", Grammage = "80gr", Color = "blanc" },
            new PaperModel { Id = 2, Name = "Papier 2", Texture = "Grain fin", Grammage = "120gr", Color = "écru" },
        };
        private readonly PaperDbContext _context;

        [HttpGet("memory")]
        public ActionResult<List<PaperModel>> GetFromMemory()
        {
            return Ok(PaperList);
        }

        [HttpGet("memory/{id}")]
        public ActionResult<PaperModel> GetFromMemory(int id)
        {
            var paper = PaperList.FirstOrDefault(p => p.Id == id);
            if (paper == null)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }
            return Ok(paper);
        }

        [HttpPut("memory/{id}")]
        public ActionResult<PaperModel> PutFromMemory([FromBody] PaperModel paper, int id)
        {
            var paperIndex = PaperList.FindIndex(p => p.Id == id);
            if (paperIndex == -1)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }

            paper.Id = id; // S'assurer que l'ID reste cohérent
            PaperList[paperIndex] = paper;

            return Ok(paper);
        }

        [HttpPost("memory")]
        public ActionResult PostFromMemory([FromBody] PaperModel paper)
        {
            MaxId++;
            paper.Id = MaxId;
            PaperList.Add(paper);

            return CreatedAtAction(nameof(GetFromMemory), new { id = paper.Id }, paper);
        }

        // Supprimer un papier par son ID
        [HttpDelete("memory/{id}")]
        public ActionResult DeleteFromMemory(int id)
        {
            var paperIndex = PaperList.FindIndex(p => p.Id == id);
            if (paperIndex == -1)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }

            PaperList.RemoveAt(paperIndex);
            return NoContent();
        }
        [HttpGet("db")]
        public async Task<ActionResult<List<PaperModel>>> GetFromDatabase()
        {
            return await _context.Papers.ToListAsync();
        }

        [HttpGet("db/{id}")]
        public async Task<ActionResult<PaperModel>> GetFromDatabase(int id)
        {
            var paper = await _context.Papers.FindAsync(id);
            if (paper == null)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }
            return Ok(paper);
        }

        [HttpPost("db")]
        public async Task<ActionResult> PostFromDatabase([FromBody] PaperModel paper)
        {
            _context.Papers.Add(paper);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFromDatabase), new { id = paper.Id }, paper);
        }

        [HttpPut("db/{id}")]
        public async Task<ActionResult> PutFromDatabase(int id, [FromBody] PaperModel paper)
        {
            if (id != paper.Id)
            {
                return BadRequest(new { Message = "L'ID dans l'URL et le corps ne correspondent pas." });
            }

            if (!_context.Papers.Any(p => p.Id == id))
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }

            _context.Entry(paper).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(paper);
        }

        [HttpDelete("db/{id}")]
        public async Task<ActionResult> DeleteFromDatabase(int id)
        {
            var paper = await _context.Papers.FindAsync(id);
            if (paper == null)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }

            _context.Papers.Remove(paper);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
