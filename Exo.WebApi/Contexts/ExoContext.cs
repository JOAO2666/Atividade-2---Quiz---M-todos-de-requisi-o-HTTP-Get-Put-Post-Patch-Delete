using Microsoft.EntityFrameworkCore;
using Exo.WebApi.Models;

namespace Exo.WebApi.Contexts
{
    public class ExoContext : DbContext
    {
        public ExoContext()
        {
        }

        public ExoContext(DbContextOptions<ExoContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // String de conexão padrão local para SQL Server / LocalDB
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ExoApi;Trusted_Connection=True;TrustServerCertificate=True;");
            }
        }

        public DbSet<Projeto> Projetos { get; set; } = null!;
        public DbSet<Usuario> Usuarios { get; set; } = null!;
    }
}

