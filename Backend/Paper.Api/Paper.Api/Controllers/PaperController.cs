using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Paper.Api.Models;
using System.Numerics;

namespace Paper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperController : ControllerBase
    {
        private static List<PaperModel> PaperList = new()
        {
            new PaperModel { Id = 1, Name = "Papier 1", Texture = "Lisse", Grammage = "80gr", Color = "blanc" },
            new PaperModel { Id = 2, Name = "Papier 2", Texture = "Grain fin", Grammage = "120gr", Color = "écru" },
        };
        
        [HttpGet()]
        public ActionResult<List<PaperModel>> Get()
        {
            return Ok(PaperList);
        }

        [HttpGet("{id}")]
        public ActionResult<PaperModel> Get(int id)
        {
            var paper = PaperList.FirstOrDefault(p => p.Id == id);
            if (paper == null)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }
            return Ok(paper);
        }

        [HttpPut("{id}")]
        public ActionResult<PaperModel> Put([FromBody] PaperModel paper, int id)
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

        [HttpPost]
        public ActionResult Post([FromBody] PaperModel paper)
        {
            MaxId++;
            paper.Id = MaxId;
            PaperList.Add(paper);

            return CreatedAtAction(nameof(Get), new { id = paper.Id }, paper);
        }

        // Supprimer un papier par son ID
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var paperIndex = PaperList.FindIndex(p => p.Id == id);
            if (paperIndex == -1)
            {
                return NotFound(new { Message = $"Le papier avec l'ID {id} n'existe pas." });
            }

            PaperList.RemoveAt(paperIndex);
            return NoContent();
        }
    }
}
