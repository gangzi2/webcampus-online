namespace backend_api.Models;

public class UserCreateRequest
{
    public string Nom { get; set; } = string.Empty;
    public string? Prenom { get; set; }
    public string Email { get; set; } = string.Empty;
    public string MotDePasse { get; set; } = string.Empty; // Mot de passe en clair reçu du client
    public int RoleId { get; set; } = 3; // Rôle par défaut
    public string? ClientId { get; set; }
    public string? ManagerId { get; set; }
}
