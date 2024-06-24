namespace FormaPagamentoMicroservice.Models
{
    public interface IFormaPagamentoDataBaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string FormaPagamentoCollectionName { get; set; }
    }

    public class FormaPagamentoDataBaseSettings : IFormaPagamentoDataBaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string FormaPagamentoCollectionName { get; set; } = string.Empty;
    }
}