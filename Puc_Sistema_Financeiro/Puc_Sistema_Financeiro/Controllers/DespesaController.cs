using Microsoft.AspNetCore.Mvc;
using Puc_Sistema_Financeiro.Models;
using WebApiMongoDB.Services;

namespace Puc_Sistema_Financeiro.Controllers
{
    [Route("api/despesa")]
    [ApiController]
    public class DespesaController : ControllerBase
    {
        private readonly DespesaService _despesaService;

        public DespesaController(DespesaService despesaService)
        {
            _despesaService = despesaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Despesa>>> GetDespesas()
        {
            var despesas = await _despesaService.GetAsync();
            return Ok(despesas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Despesa>> GetDespesa(string id)
        {
            var despesa = await _despesaService.GetAsync(id);
            if (despesa == null)
            {
                return NotFound();
            }
            return Ok(despesa);
        }

        [HttpPost]
        public async Task<ActionResult<Despesa>> CreateDespesa(Despesa despesa)
        {

            despesa.Id = null;

            await _despesaService.CreateAsync(despesa);
            return CreatedAtAction(nameof(GetDespesa), new { id = despesa.Id }, despesa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDespesa(string id, Despesa despesa)
        {
            if (id != despesa.Id)
            {
                return BadRequest();
            }

            await _despesaService.UpdateAsync(id, despesa);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDespesa(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa == null)
            {
                return NotFound();
            }

            await _despesaService.RemoveAsync(id);
            return NoContent();
        }
    }
}
