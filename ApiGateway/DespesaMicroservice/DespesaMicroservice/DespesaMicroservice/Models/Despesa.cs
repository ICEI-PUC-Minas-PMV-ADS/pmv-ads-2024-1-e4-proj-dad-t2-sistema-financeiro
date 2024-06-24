using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using DespesaMicroservice.Controllers;

namespace DespesaMicroservice.Models
{
    public class Despesa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [MinLength(3, ErrorMessage = "O campo Nome deve ter no mínimo 3 caracteres.")]
        public string? Nome { get; set; }
        [Required(ErrorMessage = "O campo Valor é obrigatório.")]
        [DecimalValue(ErrorMessage = "O campo Valor deve ser um número.")]
        public decimal Valor { get; set; }
        [Required(ErrorMessage = "O campo Data de Compra é obrigatório.")]
        public DateTime DataCompra { get; set; }
        [Required(ErrorMessage = "O campo Data de Vencimento é obrigatório.")]
        public DateTime DataVencimento { get; set; }
        [Required(ErrorMessage = "Escolha Falso ou Verdadeiro")]
        public bool StatusPago { get; set; }
        public string? FormaPagamentoId { get; set; }
        public string? CategoriaId { get; set; }



    }
}
