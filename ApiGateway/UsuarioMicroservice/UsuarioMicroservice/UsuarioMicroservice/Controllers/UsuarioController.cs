using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UsuarioMicroservice.Models;
using WebApiMongoDB.Services;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DnsClient;
using Microsoft.AspNetCore.Authorization;

namespace UsuarioMicroservice.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioSistemaFinanceiroController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        private readonly IConfiguration _configuration;

        public UsuarioSistemaFinanceiroController(UsuarioService usuarioService, IConfiguration configuration)
        {
            _usuarioService = usuarioService;
            _configuration = configuration;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> GetUsuarios()
        {
            var usuarios = await _usuarioService.GetUsuariosAsync();
            return Ok(usuarios);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(string id)
        {
            var usuario = await _usuarioService.GetUsuarioAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Usuario>> CreateUsuario(Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(usuario.Email) || !await IsValidEmailDomain(usuario.Email))
            {
                return BadRequest(new { Error = "O domínio do e-mail não é válido." });
            }

            if (await EmailExists(usuario.Email))
            {
                return BadRequest(new { Error = "O e-mail já está em uso." });
            }

            if (usuario.Senha == null || !IsValidPassword(usuario.Senha))
            {
                return BadRequest(new { Error = "A senha deve ter entre 8 e 20 caracteres." });
            }

            usuario.Id = null;

            await _usuarioService.CreateUsuarioAsync(usuario);
            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(string id, Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest(new { Error = "O ID inserido não corresponde ao ID do Usuário." });
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }

            if (string.IsNullOrEmpty(usuario.Email) || !await IsValidEmailDomain(usuario.Email))
            {
                return BadRequest(new { Error = "O domínio do e-mail não é válido." });
            }

            var existingUsuario = await _usuarioService.GetUsuarioByEmailAsync(usuario.Email);
            if (existingUsuario != null && existingUsuario.Id != id)
            {
                return BadRequest(new { Error = "O e-mail já está em uso." });
            }

            if (usuario.Senha == null || !IsValidPassword(usuario.Senha))
            {
                return BadRequest(new { Error = "A senha deve ter entre 8 e 20 caracteres." });
            }

            await _usuarioService.UpdateUsuarioAsync(id, usuario);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(string id)
        {
            var usuario = await _usuarioService.GetUsuarioAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            await _usuarioService.DeleteUsuarioAsync(id);
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario.UserLogin userLogin)
        {
            if (userLogin == null)
            {
                return BadRequest("Dados de login não fornecidos.");
            }

            if (string.IsNullOrEmpty(userLogin.Email) || string.IsNullOrEmpty(userLogin.Senha))
            {
                return BadRequest("Email e Senha são obrigatórios.");
            }

            var usuario = await _usuarioService.GetUsuarioByEmailAsync(userLogin.Email);
            if (usuario == null || usuario.Senha != userLogin.Senha)
            {
                return Unauthorized("Credenciais inválidas.");
            }

            var token = GenerateJwtToken(userLogin.Email);
            return Ok(new { Token = token, UserId = usuario.Id });
        }

        private string GenerateJwtToken(string email)
        {
            var issuer = _configuration["JWT_ISSUER"];
            var audience = _configuration["JWT_AUDIENCE"];
            var key = _configuration["JWT_KEY"];

            if (string.IsNullOrEmpty(key))
            {
                throw new InvalidOperationException("A chave JWT não pode ser nula ou vazia.");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // Registrar o token gerado no log
            Console.WriteLine($"Token gerado: {tokenString}");

            return tokenString;
        }

        private async Task<bool> IsValidEmailDomain(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!emailRegex.IsMatch(email))
            {
                return false;
            }

            var domain = email.Split('@')[1];
            try
            {
                var lookup = new LookupClient();
                var result = await lookup.QueryAsync(domain, QueryType.MX);
                return result.Answers.MxRecords().Any();
            }
            catch
            {
                return false;
            }
        }

        private async Task<bool> EmailExists(string email)
        {
            var usuario = await _usuarioService.GetUsuarioByEmailAsync(email);
            return usuario != null;
        }

        private bool IsValidPassword(string password)
        {
            return !string.IsNullOrEmpty(password) && password.Length >= 8 && password.Length <= 20;
        }
    }
}