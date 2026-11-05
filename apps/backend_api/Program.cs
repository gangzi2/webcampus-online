
using MySqlConnector;
using backend_api.Repositories; // Ajustez selon votre namespace
using backend_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                       ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// 2. Enregistrer le DataSource MySQL en Singleton (recommandé pour le pooling)
builder.Services.AddSingleton(new MySqlDataSource(connectionString));

// 3. Enregistrer vos Repositories métiers
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<EmailService>();
// 3. CONFIGURATION DE L'AUTHENTIFICATION JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not found.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });
// 4. Services Web API standard
builder.Services.AddControllers();
builder.Services.AddAuthorization();
// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Active la génération du document OpenAPI au format JSON
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

 app.UseHttpsRedirection();

 

 
// 4. PIPELINE DE SÉCURITÉ (Ordre critique !)
app.UseAuthentication();
app.UseAuthorization();


app.MapGet("/", async (MySqlDataSource dataSource) =>
{
    try
    {
        using var connection = await dataSource.OpenConnectionAsync();
        
        // Récupération dynamique de la version de l'assembly (votre API)
        var assemblyVersion = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "1.0.0";
        
        // Récupération de la version de .NET Runtime
        var dotnetVersion = System.Environment.Version.ToString();

        return Results.Ok(new { 
            status = "Success", 
            message = "Connexion à la base de données MySQL réussie !",
            versions = new {
                api = assemblyVersion,
                dotnet = dotnetVersion,
                mysql = connection.ServerVersion
            },
            database = connection.Database
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            statusCode: 500, 
            title: "Échec de la connexion à la base de données", 
            detail: ex.Message
        );
    }
});
app.MapControllers();
app.Run();
 