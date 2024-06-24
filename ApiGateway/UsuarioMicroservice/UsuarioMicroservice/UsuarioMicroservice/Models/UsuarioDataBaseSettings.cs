namespace UsuarioMicroservice.Models
{
    public interface IUsuarioDataBaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string UsuarioCollectionName { get; set; }
    }

    public class UsuarioDataBaseSettings : IUsuarioDataBaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string UsuarioCollectionName { get; set; } = string.Empty;
    }
}