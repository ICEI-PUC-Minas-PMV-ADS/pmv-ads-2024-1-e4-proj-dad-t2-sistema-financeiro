using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Puc_Sistema_Financeiro.Models;
using Puc_Sistema_Financeiro.Models.Puc_Sistema_Financeiro.Models;

namespace Puc_Sistema_Financeiro.Services
{
    public class SistemaFinanceiroService
    {
        private readonly IMongoCollection<SistemaFinanceiro> _sistemaFinanceiroCollection;

        public SistemaFinanceiroService(IOptions<SistemaFinanceiroDataBaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _sistemaFinanceiroCollection = database.GetCollection<SistemaFinanceiro>(settings.Value.SistemaFinanceiroCollectionName);
        }

        public async Task<List<SistemaFinanceiro>> GetSistemasFinanceirosAsync()
        {
            return await _sistemaFinanceiroCollection.Find(sistema => true).ToListAsync();
        }

        public async Task<SistemaFinanceiro> GetSistemaFinanceiroAsync(string id)
        {
            return await _sistemaFinanceiroCollection.Find(sistema => sistema.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateSistemaFinanceiroAsync(SistemaFinanceiro sistemaFinanceiro)
        {
            await _sistemaFinanceiroCollection.InsertOneAsync(sistemaFinanceiro);
        }

        public async Task UpdateSistemaFinanceiroAsync(string id, SistemaFinanceiro sistemaFinanceiroIn)
        {
            await _sistemaFinanceiroCollection.ReplaceOneAsync(sistema => sistema.Id == id, sistemaFinanceiroIn);
        }

        public async Task DeleteSistemaFinanceiroAsync(string id)
        {
            await _sistemaFinanceiroCollection.DeleteOneAsync(sistema => sistema.Id == id);
        }
    }
}
