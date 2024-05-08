using Microsoft.AspNetCore.Mvc;
using Puc_Sistema_Financeiro.Models;
using Puc_Sistema_Financeiro.Services;

namespace Puc_Sistema_Financeiro.Controllers
{

    [Route("api/usuario-sistema-financeiro")]
    [ApiController]
    public class UsuarioSistemaFinanceiroController : ControllerBase
    {
        private readonly UsuarioSistemaFinanceiroService _usuarioService;

        public UsuarioSistemaFinanceiroController(UsuarioSistemaFinanceiroService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UsuarioSistemaFinanceiro>>> GetUsuarios()
        {
            var usuarios = await _usuarioService.GetUsuariosAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioSistemaFinanceiro>> GetUsuario(string id)
        {
            var usuario = await _usuarioService.GetUsuarioAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<ActionResult<UsuarioSistemaFinanceiro>> CreateUsuario(UsuarioSistemaFinanceiro usuario)
        {

            usuario.Id = null;

            await _usuarioService.CreateUsuarioAsync(usuario);
            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(string id, UsuarioSistemaFinanceiro usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            await _usuarioService.UpdateUsuarioAsync(id, usuario);
            return NoContent();
        }

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
    }
}
