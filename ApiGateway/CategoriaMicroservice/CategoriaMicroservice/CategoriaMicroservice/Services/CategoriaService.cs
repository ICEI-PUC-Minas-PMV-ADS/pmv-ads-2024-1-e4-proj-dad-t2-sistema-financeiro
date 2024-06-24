using Microsoft.Extensions.Options;
using MongoDB.Driver;
using CategoriaMicroservice.Models;

namespace WebApiMongoDB.Services
{
    public class CategoriaService
    {
        private readonly IMongoCollection<Categoria> _categoriaCollection;

        public CategoriaService(IOptions<CategoriaDataBaseSettings> categoriaSettings)
        {
            var mongoClient = new MongoClient(categoriaSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(categoriaSettings.Value.DatabaseName);

            _categoriaCollection = mongoDatabase.GetCollection<Categoria>
                (categoriaSettings.Value.CategoriaCollectionName);

        }

        public async Task<List<Categoria>> GetAsync() =>
            await _categoriaCollection.Find(x => true).ToListAsync();
        public async Task<Categoria> GetAsync(string id) =>
           await _categoriaCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Categoria categoria) =>
            await _categoriaCollection.InsertOneAsync(categoria);
        public async Task UpdateAsync(string id, Categoria categoria) =>
           await _categoriaCollection.ReplaceOneAsync(x => x.Id == id, categoria);
        public async Task RemoveAsync(string id) =>
            await _categoriaCollection.DeleteOneAsync(x => x.Id == id);
    }
}
