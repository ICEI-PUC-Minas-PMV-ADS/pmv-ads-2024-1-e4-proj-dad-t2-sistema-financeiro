namespace Puc_Sistema_Financeiro.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    using System.ComponentModel.DataAnnotations;

    namespace Puc_Sistema_Financeiro.Models
    {
        public class SistemaFinanceiro
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
           
            public string? Id { get; set; }

            [Display(Name = "Nome")]
            public string? Nome { get; set; }

            public int? Mes { get; set; }
            public int? Ano { get; set; }
            public int? DiaFechamento { get; set; }
            public bool GerarCopiaDespesa { get; set; }
            public int? MesCopia { get; set; }
            public int? AnoCopia { get; set; }
        }
    }

}
