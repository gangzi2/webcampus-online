namespace backend_api.Services;
using backend_api.Repositories;
using backend_api.Models;
using Microsoft.AspNetCore.Identity;

public class UserService
{

    private readonly UserRepository _userRepository;
    private readonly PasswordHasher<User> _passwordHasher = new();

    public UserService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

public async Task<string> CreateUserAsync(UserCreateRequest request)
    {
        // 1. Génération de l'ID UUID (char(36))
        var userId = Guid.NewGuid().ToString();

        // 2. Hachage sécurisé du mot de passe
        var dummyUserForHash = new User();
        var hashedPassword = _passwordHasher.HashPassword(dummyUserForHash, request.MotDePasse);

        // 3. Construction de l'objet métier complet
        var user = new User
        {
            Id = userId,
            Nom = request.Nom,
            Prenom = request.Prenom,
            Email = request.Email,
            MotDePasseHash = hashedPassword,
            RoleId = request.RoleId,
            ClientId = request.ClientId,
            StripeCustomerId = null, // Sera rempli plus tard lors du paiement Stripe
            Actif = true,            // Actif par défaut à la création
            ManagerId = request.ManagerId
        };

        // 4. Appel de la DAL pour enregistrer en base
        await _userRepository.CreateAsync(user);

        return userId;
    }
}
