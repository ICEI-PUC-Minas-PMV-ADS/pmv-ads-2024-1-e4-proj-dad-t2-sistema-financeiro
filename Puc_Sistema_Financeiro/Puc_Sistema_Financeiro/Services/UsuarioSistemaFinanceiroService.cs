using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Puc_Sistema_Financeiro.Models;

namespace Puc_Sistema_Financeiro.Services
{
    public class UsuarioSistemaFinanceiroService
    {
        private readonly IMongoCollection<UsuarioSistemaFinanceiro> _usuarioCollection;

        public UsuarioSistemaFinanceiroService(IOptions<UsuarioSistemaFinanceiroDataBaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _usuarioCollection = database.GetCollection<UsuarioSistemaFinanceiro>(settings.Value.UsuarioSistemaFinanceiroCollectionName);
        }

        public async Task<List<UsuarioSistemaFinanceiro>> GetUsuariosAsync()
        {
            return await _usuarioCollection.Find(usuario => true).ToListAsync();
        }

        public async Task<UsuarioSistemaFinanceiro> GetUsuarioAsync(string id)
        {
            return await _usuarioCollection.Find(usuario => usuario.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateUsuarioAsync(UsuarioSistemaFinanceiro usuario)
        {
            await _usuarioCollection.InsertOneAsync(usuario);
        }

        public async Task UpdateUsuarioAsync(string id, UsuarioSistemaFinanceiro usuarioIn)
        {
            await _usuarioCollection.ReplaceOneAsync(usuario => usuario.Id == id, usuarioIn);
        }

        public async Task DeleteUsuarioAsync(string id)
        {
            await _usuarioCollection.DeleteOneAsync(usuario => usuario.Id == id);
        }
    }
}
