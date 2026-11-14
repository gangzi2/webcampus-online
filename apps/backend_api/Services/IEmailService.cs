namespace backend_api.Services;

public interface IEmailService
{
    Task SendContactEmailAsync(string replyTo, string subject, string body, CancellationToken cancellationToken);
}
