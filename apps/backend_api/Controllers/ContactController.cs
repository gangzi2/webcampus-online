using System.Net.Mail;
using backend_api.Models;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace backend_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ContactController(IEmailService emailService, ILogger<ContactController> logger) : ControllerBase
{
    /// <summary>Envoie un message à l'équipe WebCampus.</summary>
    [HttpPost]
    [EnableRateLimiting("contact")]
    [RequestSizeLimit(65536)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status503ServiceUnavailable)]
    public async Task<IActionResult> Send([FromBody] CreateContactRequest request, CancellationToken cancellationToken)
    {
        if (request.Name.Trim().Length < 2)
            ModelState.AddModelError(nameof(request.Name), "Le nom doit contenir au moins 2 caractères.");
        if (request.Subject.Trim().Length < 3)
            ModelState.AddModelError(nameof(request.Subject), "Le sujet doit contenir au moins 3 caractères.");
        if (request.Message.Trim().Length < 10)
            ModelState.AddModelError(nameof(request.Message), "Le message doit contenir au moins 10 caractères.");
        if (!MailAddress.TryCreate(request.Email, out var address) ||
            address.Address != request.Email ||
            request.Email.Contains('\r') || request.Email.Contains('\n'))
        {
            ModelState.AddModelError(nameof(request.Email), "Adresse e-mail invalide.");
        }
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var body = $"Nom : {request.Name.Trim()}\nE-mail : {request.Email}\nTéléphone : {request.Phone?.Trim()}\n\n{request.Message.Trim()}";
        try
        {
            await emailService.SendContactEmailAsync(request.Email, request.Subject.Trim(), body, cancellationToken);
            return NoContent();
        }
        catch (Exception ex) when (ex is SmtpException or InvalidOperationException or FormatException or ArgumentException)
        {
            logger.LogError(ex, "L'envoi du message de contact a échoué.");
            return Problem(statusCode: StatusCodes.Status503ServiceUnavailable,
                title: "L'envoi du message est temporairement indisponible.");
        }
    }
}
