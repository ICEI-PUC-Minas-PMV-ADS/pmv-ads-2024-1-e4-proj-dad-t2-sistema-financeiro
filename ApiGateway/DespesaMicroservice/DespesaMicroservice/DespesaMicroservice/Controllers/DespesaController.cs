using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DespesaMicroservice.Models;
using WebApiMongoDB.Services;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace DespesaMicroservice.Controllers
{
    [Authorize]
    [Route("api/despesa")]
    [ApiController]
    public class DespesaController : ControllerBase
    {
        private readonly DespesaService _despesaService;
        private readonly HttpClient _httpClient;

        public DespesaController(DespesaService despesaService, IHttpClientFactory httpClientFactory)
        {
            _despesaService = despesaService;
            _httpClient = httpClientFactory.CreateClient();
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

        [HttpGet("byCategoria/{categoriaId}")]
        public async Task<ActionResult<List<Despesa>>> GetDespesasByCategoria(string categoriaId)
        {
            var despesasPorCategoria = await _despesaService.GetDespesasByCategoriaIdAsync(categoriaId);
            if (despesasPorCategoria == null || !despesasPorCategoria.Any())
            {
                return NotFound();
            }
            return Ok(despesasPorCategoria);
        }

        [HttpGet("byFormaPagamento/{formaPagamentoId}")]
        public async Task<ActionResult<List<Despesa>>> GetDespesasByFormaPagamento(string formaPagamentoId)
        {
            var despesasPorFormaPagamento = await _despesaService.GetDespesasByFormaPagamentoIdAsync(formaPagamentoId);
            if (despesasPorFormaPagamento == null || !despesasPorFormaPagamento.Any())
            {
                return NotFound();
            }
            return Ok(despesasPorFormaPagamento);
        }

        [HttpPost]
        public async Task<ActionResult<Despesa>> CreateDespesa(Despesa despesa)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }

            if (!IsValidDate(despesa.DataCompra) || !IsValidDate(despesa.DataVencimento))
            {
                return BadRequest(new { Error = "Data de Compra ou Data de Vencimento inválida." });
            }

            if (despesa.DataVencimento < despesa.DataCompra)
            {
                return BadRequest(new { Error = "A Data de Vencimento não pode ser menor que a Data de Compra." });
            }

            if (string.IsNullOrEmpty(despesa.CategoriaId) || !await IsValidCategoriaId(despesa.CategoriaId))
            {
                return BadRequest(new { Error = "Categoria inválida." });
            }

            if (string.IsNullOrEmpty(despesa.FormaPagamentoId) || !await IsValidFormaPagamentoId(despesa.FormaPagamentoId))
            {
                return BadRequest(new { Error = "Forma de Pagamento inválida." });
            }

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

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }

            if (!IsValidDate(despesa.DataCompra) || !IsValidDate(despesa.DataVencimento))
            {
                return BadRequest(new { Error = "Data de Compra ou Data de Vencimento inválida." });
            }

            if (despesa.DataVencimento < despesa.DataCompra)
            {
                return BadRequest(new { Error = "A Data de Vencimento não pode ser menor que a Data de Compra." });
            }

            if (string.IsNullOrEmpty(despesa.CategoriaId) || !await IsValidCategoriaId(despesa.CategoriaId))
            {
                return BadRequest(new { Error = "Categoria inválida." });
            }

            if (string.IsNullOrEmpty(despesa.FormaPagamentoId) || !await IsValidFormaPagamentoId(despesa.FormaPagamentoId))
            {
                return BadRequest(new { Error = "Forma de Pagamento inválida." });
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

        private async Task<bool> IsValidCategoriaId(string? categoriaId)
        {
            if (string.IsNullOrEmpty(categoriaId))
            {
                return false;
            }

            var token = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://apigateway.criadoresdesoftware.com.br:5001/api/categoria/{categoriaId}");
            request.Headers.Add("Authorization", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        private async Task<bool> IsValidFormaPagamentoId(string? formaPagamentoId)
        {
            if (string.IsNullOrEmpty(formaPagamentoId))
            {
                return false;
            }

            var token = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://apigateway.criadoresdesoftware.com.br:5003/api/forma-pagamento/{formaPagamentoId}");
            request.Headers.Add("Authorization", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }


        private bool IsValidDate(DateTime date)
        {
            return date != default(DateTime) && date > DateTime.MinValue && date < DateTime.MaxValue;
        }
    }
}