using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UsuarioMicroservice.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace WebApiMongoDB.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _usuarioCollection;

        public UsuarioService(IOptions<UsuarioDataBaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _usuarioCollection = database.GetCollection<Usuario>(settings.Value.UsuarioCollectionName);
        }

        public async Task<List<Usuario>> GetUsuariosAsync()
        {
            return await _usuarioCollection.Find(usuario => true).ToListAsync();
        }

        public async Task<Usuario> GetUsuarioAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id), "O ID não pode ser nulo ou vazio.");
            }

            return await _usuarioCollection.Find(usuario => usuario.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Usuario> GetUsuarioByEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email), "O email não pode ser nulo ou vazio.");
            }

            return await _usuarioCollection.Find(usuario => usuario.Email == email).FirstOrDefaultAsync();
        }

        public async Task CreateUsuarioAsync(Usuario usuario)
        {
            if (usuario == null)
            {
                throw new ArgumentNullException(nameof(usuario), "O usuário não pode ser nulo.");
            }

            await _usuarioCollection.InsertOneAsync(usuario);
        }

        public async Task UpdateUsuarioAsync(string id, Usuario usuarioIn)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id), "O ID não pode ser nulo ou vazio.");
            }

            if (usuarioIn == null)
            {
                throw new ArgumentNullException(nameof(usuarioIn), "O usuário não pode ser nulo.");
            }

            await _usuarioCollection.ReplaceOneAsync(usuario => usuario.Id == id, usuarioIn);
        }

        public async Task DeleteUsuarioAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id), "O ID não pode ser nulo ou vazio.");
            }

            await _usuarioCollection.DeleteOneAsync(usuario => usuario.Id == id);
        }
    }
}