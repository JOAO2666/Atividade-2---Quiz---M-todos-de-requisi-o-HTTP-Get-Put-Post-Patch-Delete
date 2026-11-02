using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Exo.WebApi.Models;
using Exo.WebApi.Repositories;
using Exo.WebApi.ViewModels;

namespace Exo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public LoginController(UsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        /// <summary>
        /// Realiza a autenticação do usuário e retorna um Token JWT válido.
        /// POST /api/login
        /// </summary>
        [HttpPost]
        public IActionResult Login([FromBody] LoginViewModel login)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Usuario? usuarioBuscado = _usuarioRepository.Login(login.Email, login.Senha);

                if (usuarioBuscado == null)
                {
                    return Unauthorized(new { mensagem = "E-mail ou senha incorretos." });
                }

                // Criação das declarações (claims) de identidade
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.Id.ToString()),
                    new Claim(ClaimTypes.Role, "Admin"),
                    new Claim("UsuarioId", usuarioBuscado.Id.ToString())
                };

                // Chave de assinatura definida no appsettings ou padrão seguro
                string chaveJwt = _configuration["Jwt:Key"] ?? "exoapi-chave-super-secreta-autenticacao-jwt-senai-2026";
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveJwt));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                // Emissão do Token JWT
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"] ?? "ExoApi",
                    audience: _configuration["Jwt:Audience"] ?? "ExoApiMobile",
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(2),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    mensagem = "Autenticação realizada com sucesso!",
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    usuario = new
                    {
                        id = usuarioBuscado.Id,
                        email = usuarioBuscado.Email
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao efetuar login.", detalhe = ex.Message });
            }
        }
    }
}

