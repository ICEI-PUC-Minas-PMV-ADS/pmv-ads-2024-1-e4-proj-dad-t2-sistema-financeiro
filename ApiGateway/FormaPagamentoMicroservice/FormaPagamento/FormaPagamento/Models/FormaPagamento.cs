    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    using System.ComponentModel.DataAnnotations;

    namespace FormaPagamentoMicroservice.Models
    {
        public class FormaPagamento
    {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string? Id { get; set; }
            [Required(ErrorMessage = "O campo Nome é obrigatório.")]
            [MinLength(3, ErrorMessage = "O campo Nome deve ter no mínimo 3 caracteres.")]
            public string? Nome { get; set; }
            [Required(ErrorMessage = "O campo Descrição é obrigatório.")]
            [MinLength(3, ErrorMessage = "O campo Descrição deve ter no mínimo 3 caracteres.")]
            public string? Descricao { get; set; }
        }
    }


