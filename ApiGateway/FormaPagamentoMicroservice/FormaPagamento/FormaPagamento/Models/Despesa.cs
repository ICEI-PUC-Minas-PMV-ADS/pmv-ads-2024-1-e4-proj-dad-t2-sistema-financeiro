namespace FormaPagamentoMicroservice.Models
{
    public class Despesa
    {
        public string? Id { get; set; }
        public string? Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataCompra { get; set; }
        public DateTime DataVencimento { get; set; }
        public bool StatusPago { get; set; }
        public string? FormaPagamentoId { get; set; }
        public string? CategoriaId { get; set; }
    }
}