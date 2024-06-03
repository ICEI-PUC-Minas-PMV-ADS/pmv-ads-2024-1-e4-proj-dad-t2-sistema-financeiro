using Puc_Sistema_Financeiro.Models;
using Puc_Sistema_Financeiro.Services;
using WebApiMongoDB.Services;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<CategoriaDataBaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<CategoriaService>();

builder.Services.Configure<DespesaDataBaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<DespesaService>();

builder.Services.Configure<SistemaFinanceiroDataBaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<SistemaFinanceiroService>();

builder.Services.Configure<UsuarioSistemaFinanceiroDataBaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<UsuarioSistemaFinanceiroService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularAndReactNativeApps",
        builder =>
        {
            builder.WithOrigins(
                "http://localhost:4200", // URL do aplicativo Angular
                "http://192.168.1.2:8081" // URL do aplicativo React Native
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

builder.WebHost.UseKestrel(options =>
{
    options.Listen(System.Net.IPAddress.Any, 7154);
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowAngularAndReactNativeApps");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();