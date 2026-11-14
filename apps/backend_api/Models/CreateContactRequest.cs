using System.ComponentModel.DataAnnotations;

namespace backend_api.Models;

/// <summary>Message envoyé depuis le formulaire de contact.</summary>
public sealed record CreateContactRequest
{
    [Required, MinLength(2), MaxLength(120)]
    public required string Name { get; init; }

    [Required, EmailAddress, MaxLength(254)]
    public required string Email { get; init; }

    [MaxLength(40), RegularExpression(@"^[\d\s+().-]*$")]
    public string? Phone { get; init; }

    [Required, MinLength(3), MaxLength(200), RegularExpression(@"^[^\r\n]+$")]
    public required string Subject { get; init; }

    [Required, MinLength(10), MaxLength(10000)]
    public required string Message { get; init; }
}
