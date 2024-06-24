using Microsoft.AspNetCore.Mvc;
using CategoriaMicroservice.Models;
using WebApiMongoDB.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net.Http.Json;

namespace CategoriaMicroservice.Controllers
{
    [Authorize]
    [Route("api/categoria")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _categoriaService;
        private readonly HttpClient _httpClient;

        public CategoriaController(CategoriaService categoriaService, IHttpClientFactory httpClientFactory)
        {
            _categoriaService = categoriaService;
            _httpClient = httpClientFactory.CreateClient();
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
            return Ok(categoria);
        }

        [HttpPost]
        public async Task<ActionResult<Categoria>> CreateCategoria(Categoria categoria)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
            }

            categoria.Id = null;

            await _categoriaService.CreateAsync(categoria);
            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoria(string id, Categoria categoria)
        {
            if (id != categoria.Id)
            {
                return BadRequest(new { Error = "O ID inserido não corresponde ao ID da Categoria." });
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Errors = errors });
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

            // Verificar se a categoria está sendo usada em alguma despesa
            if (await IsCategoriaInUse(id))
            {
                return BadRequest(new { Error = "A categoria não pode ser excluída porque está sendo usada em uma ou mais despesas." });
            }

            await _categoriaService.RemoveAsync(id);
            return NoContent();
        }

        private async Task<bool> IsCategoriaInUse(string categoriaId)
        {
            var token = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://apigateway.criadoresdesoftware.com.br:5002/api/despesa/byCategoria/{categoriaId}");
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