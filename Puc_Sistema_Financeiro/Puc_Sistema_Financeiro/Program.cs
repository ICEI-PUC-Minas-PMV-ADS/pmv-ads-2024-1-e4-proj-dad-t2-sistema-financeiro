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
    options.AddPolicy("AllowAngularApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Substitua pela URL do seu aplicativo Angular
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowAngularApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
