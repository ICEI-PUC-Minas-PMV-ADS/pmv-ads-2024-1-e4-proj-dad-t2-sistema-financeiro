using Microsoft.Extensions.Options;
using MongoDB.Driver;
using FormaPagamentoMicroservice.Models;

namespace WebApiMongoDB.Services
{
    public class FormaPagamentoService
    {
        private readonly IMongoCollection<FormaPagamento> _formaPagamentoCollection;

        public FormaPagamentoService(IOptions<FormaPagamentoDataBaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _formaPagamentoCollection = database.GetCollection<FormaPagamento>(settings.Value.FormaPagamentoCollectionName);
        }

        public async Task<List<FormaPagamento>> GetFormasPagamentosAsync()
        {
            return await _formaPagamentoCollection.Find(sistema => true).ToListAsync();
        }

        public async Task<FormaPagamento> GetFormaPagamentoAsync(string id)
        {
            return await _formaPagamentoCollection.Find(sistema => sistema.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateFormaPagamentoAsync(FormaPagamento formaPagamento)
        {
            await _formaPagamentoCollection.InsertOneAsync(formaPagamento);
        }

        public async Task UpdateFormaPagamentoAsync(string id, FormaPagamento formaPagamentoIn)
        {
            await _formaPagamentoCollection.ReplaceOneAsync(sistema => sistema.Id == id, formaPagamentoIn);
        }

        public async Task DeleteFormaPagamentoAsync(string id)
        {
            await _formaPagamentoCollection.DeleteOneAsync(sistema => sistema.Id == id);
        }
    }
}
