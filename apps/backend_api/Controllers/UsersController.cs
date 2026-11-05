using Microsoft.AspNetCore.Mvc;
using backend_api.Repositories;
using backend_api.Models;
using backend_api.Services;
namespace backend_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserRepository _userRepository;
    private readonly UserService _userService;

    public UsersController(UserRepository userRepository, UserService userService)
    {
        _userRepository = userRepository;
        _userService = userService;
    }

    // GET: /api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _userRepository.GetAllAsync();
        return Ok(users);
    }

    // GET: /api/users/{id} (où l'id est un string/guid)
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(string id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
        {
            return NotFound(new { message = $"Utilisateur avec l'ID {id} introuvable." });
        }

        return Ok(user);
    }
    
    // POST: /api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserCreateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.MotDePasse))
        {
            return BadRequest(new { message = "L'email et le mot de passe sont obligatoires." });
        }

        try
        {
            var newUserId = await _userService.CreateUserAsync(request);
            
            // Renvoie un statut 201 Created avec l'ID généré
            return CreatedAtAction(nameof(GetUser), new { id = newUserId }, new { id = newUserId, message = "Utilisateur créé avec succès !" });
        }
        catch (Exception ex)
        {
            // Gestion basique d'erreur (ex: doublon d'email en base)
            return StatusCode(500, new { message = "Erreur lors de la création de l'utilisateur.", details = ex.Message });
        }
    }
}