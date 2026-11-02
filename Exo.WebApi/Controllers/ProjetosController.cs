using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Exo.WebApi.Models;
using Exo.WebApi.Repositories;

namespace Exo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        private readonly ProjetoRepository _projetoRepository;

        public ProjetosController(ProjetoRepository projetoRepository)
        {
            _projetoRepository = projetoRepository;
        }

        /// <summary>
        /// Lista todos os projetos cadastrados na ExoApi.
        /// GET /api/projetos
        /// </summary>
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                List<Projeto> lista = _projetoRepository.Listar();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro interno ao listar projetos.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Busca as informações de apenas um projeto pelo seu ID.
        /// GET /api/projetos/{id}
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                Projeto? projeto = _projetoRepository.BuscarPorId(id);

                if (projeto == null)
                {
                    return NotFound(new { mensagem = $"Projeto com ID {id} não foi encontrado." });
                }

                return Ok(projeto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao buscar projeto.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Cadastra um novo projeto na ExoApi.
        /// POST /api/projetos
        /// </summary>
        [HttpPost]
        public IActionResult Cadastrar([FromBody] Projeto projeto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(projeto.NomeDoProjeto) || string.IsNullOrWhiteSpace(projeto.Area))
                {
                    return BadRequest(new { mensagem = "Nome do projeto e área são obrigatórios." });
                }

                _projetoRepository.Cadastrar(projeto);
                return StatusCode(201, projeto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao cadastrar projeto.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Atualiza as informações de um projeto existente.
        /// Acesso restrito a usuários autenticados via JWT.
        /// PUT /api/projetos/{id}
        /// </summary>
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] Projeto projeto)
        {
            try
            {
                Projeto? projetoBuscado = _projetoRepository.BuscarPorId(id);

                if (projetoBuscado == null)
                {
                    return NotFound(new { mensagem = $"Projeto com ID {id} não foi encontrado para atualização." });
                }

                _projetoRepository.Atualizar(id, projeto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao atualizar projeto.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Atualiza parcialmente as informações de um projeto (ex: apenas status ou área).
        /// Acesso restrito a usuários autenticados via JWT.
        /// PATCH /api/projetos/{id}
        /// </summary>
        [Authorize]
        [HttpPatch("{id}")]
        public IActionResult AtualizarParcial(int id, [FromBody] Projeto projetoParcial)
        {
            try
            {
                Projeto? projetoBuscado = _projetoRepository.BuscarPorId(id);

                if (projetoBuscado == null)
                {
                    return NotFound(new { mensagem = $"Projeto com ID {id} não foi encontrado." });
                }

                if (!string.IsNullOrWhiteSpace(projetoParcial.NomeDoProjeto))
                    projetoBuscado.NomeDoProjeto = projetoParcial.NomeDoProjeto;

                if (!string.IsNullOrWhiteSpace(projetoParcial.Area))
                    projetoBuscado.Area = projetoParcial.Area;

                projetoBuscado.Status = projetoParcial.Status;

                _projetoRepository.Atualizar(id, projetoBuscado);
                return Ok(projetoBuscado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao atualizar parcialmente o projeto.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Deleta um projeto existente pelo seu ID.
        /// Acesso restrito a usuários autenticados via JWT.
        /// DELETE /api/projetos/{id}
        /// </summary>
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                Projeto? projeto = _projetoRepository.BuscarPorId(id);

                if (projeto == null)
                {
                    return NotFound(new { mensagem = $"Projeto com ID {id} não foi encontrado para deleção." });
                }

                _projetoRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao deletar projeto.", detalhe = ex.Message });
            }
        }
    }
}

