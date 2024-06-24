using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Adicionar o appsettings.json ao ConfigurationBuilder
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Configurar JWT
var issuer = builder.Configuration["JWT_ISSUER"];
var audience = builder.Configuration["JWT_AUDIENCE"];
var key = builder.Configuration["JWT_KEY"]; // Use uma chave secreta forte e segura
// Adicionar logs para verificar as configura��es
Console.WriteLine($"JWT_ISSUER: {issuer}");
Console.WriteLine($"JWT_AUDIENCE: {audience}");
Console.WriteLine($"JWT_KEY: {key}");
if (string.IsNullOrEmpty(key))
{
    throw new InvalidOperationException("A chave JWT n�o pode ser nula ou vazia.");
}

var keyBytes = Encoding.ASCII.GetBytes(key);

// Configura o logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);

// Adiciona servi�os ao cont�iner.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
            Console.WriteLine($"Token inv�lido: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine($"Token v�lido: {context.SecurityToken}");
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

// Configura o Ocelot para carregar o arquivo ocelot.json
var configuration = new ConfigurationBuilder()
    .AddJsonFile("ocelot.json")
    .Build();

builder.Services.AddOcelot(configuration);

// Configura o servi�o de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost",
            "http://localhost:4200",
            "https://localhost:7230",
            "https://192.168.1.2:8081",
            "http://192.168.1.2:8081",
            "http://192.168.1.5:8081",
            "https://192.168.1.5:8081",
            "http://localhost:90")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowedToAllowWildcardSubdomains();
        });
}); 

// Configura o Kestrel para usar HTTP
//builder.WebHost.ConfigureKestrel(options =>
//{
//    options.ListenAnyIP(4000); // Porta HTTP
//});

var app = builder.Build();

// Configura o pipeline de requisi��es HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Adiciona o middleware de CORS
app.UseCors("AllowSpecificOrigins");

// Adiciona o cabe�alho CSP usando Append
//app.Use(async (context, next) =>
//{
//    context.Response.Headers.Append("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5000 http://192.168.1.2:5000");
//    await next();
//});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Middleware para logging de requisi��es
app.Use(async (context, next) =>
{
    Console.WriteLine($"Requisi��o recebida: {context.Request.Method} {context.Request.Path}");
    if (context.Request.Headers.ContainsKey("Authorization"))
    {
        Console.WriteLine($"Cabe�alho de Autoriza��o: {context.Request.Headers["Authorization"]}");
    }
    else
    {
        Console.WriteLine("Cabe�alho de Autoriza��o ausente.");
    }
    await next();
    Console.WriteLine($"Resposta enviada: {context.Response.StatusCode}");
});

// Configura o middleware do Ocelot
await app.UseOcelot();

app.Run();