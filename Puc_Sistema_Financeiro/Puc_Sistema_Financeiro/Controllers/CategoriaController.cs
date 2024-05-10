using Microsoft.AspNetCore.Mvc;
using Puc_Sistema_Financeiro.Models;
using WebApiMongoDB.Services;

namespace WebApiMongoDB.Controllers
{
    [Route("api/categoria")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _categoriaService;

        public CategoriaController(CategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> GetCategorias()
        {
            var categorias = await _categoriaService.GetAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(string id)
        {
            var categoria = await _categoriaService.GetAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }
            return categoria;
        }

        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            categoria.Id = null;

            await _categoriaService.CreateAsync(categoria);
            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria(string id, Categoria categoria)
        {
            if (id != categoria.Id)
            {
                return BadRequest();
            }
            await _categoriaService.UpdateAsync(id, categoria);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(string id)
        {
            var categoria = await _categoriaService.GetAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }
            await _categoriaService.RemoveAsync(id);
            return NoContent();
        }
    }
}
