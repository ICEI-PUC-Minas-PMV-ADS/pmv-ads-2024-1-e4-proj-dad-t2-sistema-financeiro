using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Puc_Sistema_Financeiro.Models;

namespace WebApiMongoDB.Services
{
    public class DespesaService
    {
        private readonly IMongoCollection<Despesa> _despesaCollection;

        public DespesaService(IOptions<DespesaDataBaseSettings> despesaSettings)
        {
            var mongoClient = new MongoClient(despesaSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(despesaSettings.Value.DatabaseName);

            _despesaCollection = mongoDatabase.GetCollection<Despesa>
                (despesaSettings.Value.DespesaCollectionName);
        }

        public async Task<List<Despesa>> GetAsync() =>
            await _despesaCollection.Find(x => true).ToListAsync();

        public async Task<Despesa> GetAsync(string id) =>
            await _despesaCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Despesa despesa) =>
            await _despesaCollection.InsertOneAsync(despesa);

        public async Task UpdateAsync(string id, Despesa despesa) =>
            await _despesaCollection.ReplaceOneAsync(x => x.Id == id, despesa);

        public async Task RemoveAsync(string id) =>
            await _despesaCollection.DeleteOneAsync(x => x.Id == id);
    }
}
