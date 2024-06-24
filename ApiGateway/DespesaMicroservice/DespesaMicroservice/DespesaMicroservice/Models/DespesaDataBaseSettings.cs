namespace DespesaMicroservice.Models
{
    public interface IDespesaDataBaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string DespesaCollectionName { get; set; }
    }

    public class DespesaDataBaseSettings : IDespesaDataBaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string DespesaCollectionName { get; set; } = string.Empty;
    }
}