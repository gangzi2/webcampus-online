namespace backend_api.Models;

public class User
{
    public string Id { get; set; } = string.Empty;
    public string Nom { get; set; } = string.Empty;
    public string? Prenom { get; set; }
    public string Email { get; set; } = string.Empty;
    public string MotDePasseHash { get; set; } = string.Empty;
    public int RoleId { get; set; }
    public string? ClientId { get; set; }
    public string? StripeCustomerId { get; set; }
    public bool Actif { get; set; }
    public DateTime CreeLe { get; set; }
    public DateTime MisAJourLe { get; set; }
    public string? ManagerId { get; set; }
}