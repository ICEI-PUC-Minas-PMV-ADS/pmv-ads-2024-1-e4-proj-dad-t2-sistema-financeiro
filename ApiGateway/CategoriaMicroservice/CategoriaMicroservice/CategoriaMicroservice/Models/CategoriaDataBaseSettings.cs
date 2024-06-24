namespace CategoriaMicroservice.Models
{
    public interface ICategoriaDataBaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string CategoriaCollectionName { get; set; }
    }

    public class CategoriaDataBaseSettings : ICategoriaDataBaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string CategoriaCollectionName { get; set; } = string.Empty;
    }
}