using Puc_Sistema_Financeiro.Models;
using Puc_Sistema_Financeiro.Services;
using WebApiMongoDB.Services;

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
