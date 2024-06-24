using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace UsuarioMicroservice.Models
{
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [MinLength(3, ErrorMessage = "O campo Nome deve ter no mínimo 3 caracteres.")]
        public string? Nome { get; set; }

        [Required(ErrorMessage = "O campo E-Mail é obrigatório.")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "O campo E-Mail não é um endereço de e-mail válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        [MinLength(6, ErrorMessage = "O campo Senha deve ter no mínimo 6 caracteres.")]
        [RegularExpression(@"^(?=.*[a-zA-Z])(?=.*\d).+$", ErrorMessage = "A senha deve conter pelo menos uma letra e um número.")]
        public string? Senha { get; set; }

        public class UserLogin
        {
            [Required(ErrorMessage = "O campo Email é obrigatório.")]
            [EmailAddress(ErrorMessage = "O campo Email deve ser um endereço de email válido.")]
            public string? Email { get; set; }

            [Required(ErrorMessage = "O campo Senha é obrigatório.")]
            public string? Senha { get; set; }
        }
    }
}