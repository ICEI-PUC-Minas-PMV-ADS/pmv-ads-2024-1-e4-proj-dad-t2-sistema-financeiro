using Microsoft.Extensions.Options;
using MongoDB.Driver;
using FormaPagamentoMicroservice.Models; // Certifique-se de que esta linha está presente
using WebApiMongoDB.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.OpenApi.Models; // Adicione esta diretiva
using Swashbuckle.AspNetCore.SwaggerGen; // Adicione esta diretiva

var builder = WebApplication.CreateBuilder(args);

// Adicionar o appsettings.json ao ConfigurationBuilder
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Configurar JWT
var issuer = builder.Configuration["JWT_ISSUER"];
var audience = builder.Configuration["JWT_AUDIENCE"];
var key = builder.Configuration["JWT_KEY"];

if (string.IsNullOrEmpty(key))
{
    throw new InvalidOperationException("A chave JWT não pode ser nula ou vazia.");
}

// Configurar serviços
builder.Services.Configure<FormaPagamentoDataBaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<FormaPagamentoService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Adicione esta parte para configurar a autenticação JWT no Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Insira o token JWT desta maneira: Bearer {seu token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Token inválido: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            var token = context.SecurityToken as JwtSecurityToken;
            if (token != null)
            {
                Console.WriteLine($"Token validado: {token}");
                Console.WriteLine($"Issuer: {token.Issuer}");
                Console.WriteLine($"Audience: {token.Audiences.FirstOrDefault()}");
                Console.WriteLine($"Expiration: {token.ValidTo}");
            }
            return Task.CompletedTask;
        },
        OnMessageReceived = context =>
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            Console.WriteLine($"Token recebido: {token}");
            return Task.CompletedTask;
        }
    };
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddHttpClient();

var app = builder.Build();

// Configurar o pipeline de requisições HTTP
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = string.Empty; // Para abrir o Swagger na raiz
});
//}

app.UseHttpsRedirection();

// Middleware para logging de requisições
app.Use(async (context, next) =>
{
    Console.WriteLine($"Requisição recebida: {context.Request.Method} {context.Request.Path}");

    if (context.Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
    {
        var token = authorizationHeader.FirstOrDefault()?.Split(" ").Last();
        Console.WriteLine($"Token recebido: {token}");
    }
    else
    {
        Console.WriteLine("Cabeçalho de Autorização ausente.");
    }

    try
    {
        await next();
    }
    catch (Exception ex)
    {
        if (ex is SecurityTokenExpiredException)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Token expirado");
        }
        else if (ex is SecurityTokenInvalidAudienceException)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Audiência do token inválida");
        }
        else if (ex is SecurityTokenInvalidIssuerException)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Emissor do token inválido");
        }
        else if (ex is SecurityTokenInvalidSignatureException)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Assinatura do token inválida");
        }
        else
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Erro interno do servidor");
        }
    }

    Console.WriteLine($"Resposta enviada: {context.Response.StatusCode}");
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Definir a porta em que o aplicativo deve rodar
var port = Environment.GetEnvironmentVariable("PORT") ?? "5004"; // Você pode alterar a porta aqui

app.Run();