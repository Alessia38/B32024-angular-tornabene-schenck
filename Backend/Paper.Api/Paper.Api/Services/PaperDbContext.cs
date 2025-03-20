using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Paper.Api.Models;

namespace Paper.Api.Services
{
    public class PaperDbContext : DbContext
    {
        public DbSet<PaperModel> Papers { get; set; }

        public PaperDbContext(DbContextOptions<PaperDbContext> options) : base(options) { }

        // Constructeur par défaut pour les outils de conception
        public PaperDbContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Remplacez par la bonne chaîne de connexion ou lisez depuis appsettings.json
                optionsBuilder.UseMySql(
                    "Server=localhost;Database=paperstack;User=root;Password=root;",
                    new MySqlServerVersion(new Version(8, 0, 23))
                );
            }
        }
    }
}
