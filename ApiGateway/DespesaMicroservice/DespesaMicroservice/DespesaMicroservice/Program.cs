using Microsoft.Extensions.Options;
using MongoDB.Driver;
using DespesaMicroservice.Models; // Certifique-se de que esta linha está presente
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
builder.Services.Configure<DespesaDataBaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<DespesaService>();

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

// Configurar o HttpClient
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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Definir a porta em que o aplicativo deve rodar
var port = Environment.GetEnvironmentVariable("PORT") ?? "5002"; // Você pode alterar a porta aqui

app.Run();