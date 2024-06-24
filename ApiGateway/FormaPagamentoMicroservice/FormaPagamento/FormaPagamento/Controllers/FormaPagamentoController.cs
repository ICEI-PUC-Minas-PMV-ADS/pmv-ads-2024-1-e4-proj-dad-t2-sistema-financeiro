using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using FormaPagamentoMicroservice.Models;
using WebApiMongoDB.Services;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net.Http.Json;
using Amazon.Runtime;

namespace FormaPagamentoMicroservice.Controllers
{
    [Authorize]
    [Route("api/forma-pagamento")]
    [ApiController]
    public class FormaPagamentoController : ControllerBase
    {
        private readonly FormaPagamentoService _formaPagamentoService;
        private readonly HttpClient _httpClient;
        
        public FormaPagamentoController(FormaPagamentoService formaPagamentoService, IHttpClientFactory httpClientFactory)
        {
            _formaPagamentoService = formaPagamentoService;
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<ActionResult<List<FormaPagamento>>> GetFormasPagamentos()
        {
            var formasPagamentos = await _formaPagamentoService.GetFormasPagamentosAsync();
            return Ok(formasPagamentos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FormaPagamento>> GetFormaPagamento(string id)
        {
            var formaPagamento = await _formaPagamentoService.GetFormaPagamentoAsync(id);
            if (formaPagamento == null)
            {
                return NotFound();
            }
            return Ok(formaPagamento);
        }

        [HttpPost]
        public async Task<ActionResult<FormaPagamento>> CreateFormaPagamento(FormaPagamento formaPagamento)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }
            formaPagamento.Id = null;

            await _formaPagamentoService.CreateFormaPagamentoAsync(formaPagamento);
            return CreatedAtAction(nameof(GetFormaPagamento), new { id = formaPagamento.Id }, formaPagamento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFormaPagamento(string id, FormaPagamento formaPagamento)
        {
            if (id != formaPagamento.Id)
            {
                return BadRequest(new { Error = "O ID inserido não corresponde ao ID da Forma de Pagamento." });
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }
            await _formaPagamentoService.UpdateFormaPagamentoAsync(id, formaPagamento);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormaPagamento(string id)
        {
            var formaPagamento = await _formaPagamentoService.GetFormaPagamentoAsync(id);
            if (formaPagamento == null)
            {
                return NotFound();
            }

            // Verificar se a forma de pagamento está sendo usada em alguma despesa
            if (await IsFormaPagamentoInUse(id))
            {
                return BadRequest(new { Error = "A forma de pagamento não pode ser excluída porque está sendo usada em uma ou mais despesas." });
            }

            await _formaPagamentoService.DeleteFormaPagamentoAsync(id);
            return NoContent();
        }
        private async Task<bool> IsFormaPagamentoInUse(string formaPagamentoId)
        {
            var token = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://apigateway.criadoresdesoftware.com.br:5002/api/despesa/byFormaPagamento/{formaPagamentoId}");
            request.Headers.Add("Authorization", token);

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }

            var despesas = await response.Content.ReadFromJsonAsync<List<Despesa>>();
            return despesas != null && despesas.Any();
        }
    }
}
