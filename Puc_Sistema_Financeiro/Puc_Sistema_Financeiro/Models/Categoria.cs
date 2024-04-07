using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Puc_Sistema_Financeiro.Models
{
    public class Categoria
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 

        [BsonElement("Nome")]
        public string? Nome { get; set; }
        public string? SistemaId { get; set; } 
    }
}
