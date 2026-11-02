using Microsoft.AspNetCore.Mvc;
using Exo.WebApi.Models;
using Exo.WebApi.Repositories;

namespace Exo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioRepository _usuarioRepository;

        public UsuariosController(UsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        /// <summary>
        /// Lista todos os usuários cadastrados na aplicação.
        /// GET /api/usuarios
        /// </summary>
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                List<Usuario> lista = _usuarioRepository.Listar();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao listar usuários.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Busca informações de um usuário específico pelo ID.
        /// GET /api/usuarios/{id}
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                Usuario? usuario = _usuarioRepository.BuscarPorId(id);

                if (usuario == null)
                {
                    return NotFound(new { mensagem = $"Usuário com ID {id} não encontrado." });
                }

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao buscar usuário.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Cadastra um novo usuário no sistema.
        /// POST /api/usuarios
        /// </summary>
        [HttpPost]
        public IActionResult Cadastrar([FromBody] Usuario usuario)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(usuario.Email) || string.IsNullOrWhiteSpace(usuario.Senha))
                {
                    return BadRequest(new { mensagem = "E-mail e senha são obrigatórios." });
                }

                _usuarioRepository.Cadastrar(usuario);
                return StatusCode(201, usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao cadastrar usuário.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Atualiza todas as informações de um usuário existente.
        /// PUT /api/usuarios/{id}
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, [FromBody] Usuario usuario)
        {
            try
            {
                Usuario? usuarioBuscado = _usuarioRepository.BuscarPorId(id);

                if (usuarioBuscado == null)
                {
                    return NotFound(new { mensagem = $"Usuário com ID {id} não encontrado para atualização." });
                }

                _usuarioRepository.Atualizar(id, usuario);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao atualizar usuário.", detalhe = ex.Message });
            }
        }

        /// <summary>
        /// Remove um usuário do sistema pelo ID.
        /// DELETE /api/usuarios/{id}
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                Usuario? usuarioBuscado = _usuarioRepository.BuscarPorId(id);

                if (usuarioBuscado == null)
                {
                    return NotFound(new { mensagem = $"Usuário com ID {id} não encontrado para remoção." });
                }

                _usuarioRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao deletar usuário.", detalhe = ex.Message });
            }
        }
    }
}

