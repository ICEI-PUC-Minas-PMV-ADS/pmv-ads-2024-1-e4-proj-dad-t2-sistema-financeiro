using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Puc_Sistema_Financeiro.Models
{
    public class Despesa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       
        public string? Id { get; set; }

        [BsonElement("Nome")]
        public string? Nome { get; set; }

        public decimal Valor { get; set; }
        public int Mes { get; set; }
        public int Ano { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string? TipoDespesa { get; set; } 

        [BsonRepresentation(BsonType.String)]
        public string? DataCadastro { get; set; } 
        [BsonRepresentation(BsonType.String)]
        public string? DataAlteracao { get; set; } 
        [BsonRepresentation(BsonType.String)]
        public string? DataPagamento { get; set; } 
        [BsonRepresentation(BsonType.String)]
        public string? DataVencimento { get; set; } 

        public bool Pago { get; set; }
        public bool DespesaAntrasada { get; set; }

       
        public string? CategoriaId { get; set; }

       
    }
}
