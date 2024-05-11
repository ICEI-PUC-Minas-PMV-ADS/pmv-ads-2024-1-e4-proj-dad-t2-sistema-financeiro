using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Puc_Sistema_Financeiro.Models.Puc_Sistema_Financeiro.Models;
using Puc_Sistema_Financeiro.Services;

namespace Puc_Sistema_Financeiro.Controllers
{
    [Route("api/sistema-financeiro")]
    [ApiController]
    [EnableCors("AllowAngularApp")]
    public class SistemaFinanceiroController : ControllerBase
    {
        private readonly SistemaFinanceiroService _sistemaFinanceiroService;

        public SistemaFinanceiroController(SistemaFinanceiroService sistemaFinanceiroService)
        {
            _sistemaFinanceiroService = sistemaFinanceiroService;
        }

        [HttpGet]
        public async Task<ActionResult<List<SistemaFinanceiro>>> GetSistemasFinanceiros()
        {
            var sistemasFinanceiros = await _sistemaFinanceiroService.GetSistemasFinanceirosAsync();
            return Ok(sistemasFinanceiros);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SistemaFinanceiro>> GetSistemaFinanceiro(string id)
        {
            var sistemaFinanceiro = await _sistemaFinanceiroService.GetSistemaFinanceiroAsync(id);
            if (sistemaFinanceiro == null)
            {
                return NotFound();
            }
            return Ok(sistemaFinanceiro);
        }

        [HttpPost]
        public async Task<ActionResult<SistemaFinanceiro>> CreateSistemaFinanceiro(SistemaFinanceiro sistemaFinanceiro)
        {
            sistemaFinanceiro.Id = null;

            await _sistemaFinanceiroService.CreateSistemaFinanceiroAsync(sistemaFinanceiro);
            return CreatedAtAction(nameof(GetSistemaFinanceiro), new { id = sistemaFinanceiro.Id }, sistemaFinanceiro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSistemaFinanceiro(string id, SistemaFinanceiro sistemaFinanceiro)
        {
            await _sistemaFinanceiroService.UpdateSistemaFinanceiroAsync(id, sistemaFinanceiro);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSistemaFinanceiro(string id)
        {
            await _sistemaFinanceiroService.DeleteSistemaFinanceiroAsync(id);
            return NoContent();
        }
    }
}
