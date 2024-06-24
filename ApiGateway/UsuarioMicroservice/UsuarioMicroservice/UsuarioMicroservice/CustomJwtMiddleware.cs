using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class CustomJwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public CustomJwtMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task Invoke(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token != null)
            AttachUserToContext(context, token);

        await _next(context);
    }

    private void AttachUserToContext(HttpContext context, string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = _configuration["JWT_KEY"];

            if (string.IsNullOrEmpty(key))
            {
                throw new InvalidOperationException("A chave JWT não pode ser nula ou vazia.");
            }

            var keyBytes = Encoding.UTF8.GetBytes(key);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                ValidateIssuer = false,
                ValidateAudience = false,
                // Defina ValidateLifetime como false para ignorar a validação de expiração do token
                ValidateLifetime = false
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.First(x => x.Type == "id").Value;

            // Anexar o usuário ao contexto em caso de sucesso
            context.Items["User"] = userId;
        }
        catch
        {
            // Não fazer nada se a validação do token falhar
            // O usuário não será anexado ao contexto, então a requisição não terá acesso autorizado
        }
    }
}