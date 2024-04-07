using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Puc_Sistema_Financeiro.Models
{
    public class UsuarioSistemaFinanceiro
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
      
        public string? Id { get; set; }

        public string? EmailUsuario { get; set; }
        public bool Administrador { get; set; }
        public bool SistemaAtual { get; set; }
        public string? SistemaId { get; set; }
       
    }
}
