using MySqlConnector;
using backend_api.Models;

namespace backend_api.Repositories;

public class UserRepository
{
    private readonly MySqlDataSource _dataSource;

    public UserRepository(MySqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    // 1. Récupérer TOUS les utilisateurs
    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var users = new List<User>();

        using var connection = await _dataSource.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        command.CommandText = @"
            SELECT id, nom, prenom, email, mot_de_passe_hash, role_id, 
                   client_id, stripe_customer_id, actif, cree_le, mis_a_jour_le, manager_id 
            FROM utilisateur";

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            users.Add(MapReaderToUser(reader));
        }
        return users;
    }

    // 2. Récupérer UN utilisateur par son ID (avec paramètre sécurisé)
    public async Task<User?> GetByIdAsync(string id)
    {
        using var connection = await _dataSource.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        command.CommandText = @"
            SELECT id, nom, prenom, email, mot_de_passe_hash, role_id, 
                   client_id, stripe_customer_id, actif, cree_le, mis_a_jour_le, manager_id 
            FROM utilisateur 
            WHERE id = @id";

        command.Parameters.AddWithValue("@id", id);

        using var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return MapReaderToUser(reader);
        }

        return null;
    }

    // (Gardez vos méthodes GetAllAsync et GetByIdAsync ici...)

    // Insertion d'un utilisateur en base
    public async Task CreateAsync(User user)
    {
        using var connection = await _dataSource.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        
        command.CommandText = @"
            INSERT INTO utilisateur (
                id, nom, prenom, email, mot_de_passe_hash, role_id, 
                client_id, stripe_customer_id, actif, manager_id
            ) VALUES (
                @id, @nom, @prenom, @email, @mot_de_passe_hash, @role_id, 
                @client_id, @stripe_customer_id, @actif, @manager_id
            )";

        command.Parameters.AddWithValue("@id", user.Id);
        command.Parameters.AddWithValue("@nom", user.Nom);
        command.Parameters.AddWithValue("@prenom", (object?)user.Prenom ?? DBNull.Value);
        command.Parameters.AddWithValue("@email", user.Email);
        command.Parameters.AddWithValue("@mot_de_passe_hash", user.MotDePasseHash);
        command.Parameters.AddWithValue("@role_id", user.RoleId);
        command.Parameters.AddWithValue("@client_id", (object?)user.ClientId ?? DBNull.Value);
        command.Parameters.AddWithValue("@stripe_customer_id", (object?)user.StripeCustomerId ?? DBNull.Value);
        command.Parameters.AddWithValue("@actif", user.Actif);
        command.Parameters.AddWithValue("@manager_id", (object?)user.ManagerId ?? DBNull.Value);

        await command.ExecuteNonQueryAsync();
    }
    
    private User MapReaderToUser(MySqlDataReader reader)
    {
        return new User
        {
            Id = reader.GetString("id"),
            Nom = reader.GetString("nom"),
            Prenom = reader.IsDBNull(reader.GetOrdinal("prenom")) ? null : reader.GetString("prenom"),
            Email = reader.GetString("email"),
            MotDePasseHash = reader.GetString("mot_de_passe_hash"),
            RoleId = reader.GetInt32("role_id"),
            ClientId = reader.IsDBNull(reader.GetOrdinal("client_id")) ? null : reader.GetString("client_id"),
            StripeCustomerId = reader.IsDBNull(reader.GetOrdinal("stripe_customer_id")) ? null : reader.GetString("stripe_customer_id"),
            Actif = reader.GetBoolean("actif"),
            CreeLe = reader.GetDateTime("cree_le"),
            MisAJourLe = reader.GetDateTime("mis_a_jour_le"),
            ManagerId = reader.IsDBNull(reader.GetOrdinal("manager_id")) ? null : reader.GetString("manager_id")
        };
    }
}