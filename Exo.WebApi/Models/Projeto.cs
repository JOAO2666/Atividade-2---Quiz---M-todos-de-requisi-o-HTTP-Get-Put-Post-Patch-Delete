namespace Exo.WebApi.Models
{
    public class Projeto
    {
        public int Id { get; set; }
        public string NomeDoProjeto { get; set; } = string.Empty;
        public string Area { get; set; } = string.Empty;
        public bool Status { get; set; }
    }
}

