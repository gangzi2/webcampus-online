namespace backend_api.Services;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        await SendAsync(to, subject, body, true, null, CancellationToken.None);
    }

    public async Task SendContactEmailAsync(string replyTo, string subject, string body, CancellationToken cancellationToken)
    {
        var recipient = _configuration["EmailSettings:ContactRecipient"];
        if (string.IsNullOrWhiteSpace(recipient))
            throw new InvalidOperationException("EmailSettings:ContactRecipient is not configured.");

        await SendAsync(recipient, subject, body, false, replyTo, cancellationToken);
    }

private async Task SendAsync(
    string to,
    string subject,
    string body,
    bool isBodyHtml,
    string? replyTo,
    CancellationToken cancellationToken)
{
    var smtpServer = _configuration["EmailSettings:Server"];
    var smtpPort = int.Parse(_configuration["EmailSettings:Port"] ?? "587");

    var smtpUsername = _configuration["EmailSettings:Username"];
    var senderEmail = _configuration["EmailSettings:SenderEmail"];
    var senderPassword = _configuration["EmailSettings:SenderPassword"];

    if (string.IsNullOrWhiteSpace(smtpUsername) ||
        string.IsNullOrWhiteSpace(senderEmail) ||
        string.IsNullOrWhiteSpace(senderPassword))
    {
        throw new InvalidOperationException(
            "SMTP configuration is incomplete.");
    }

    using var client = new SmtpClient(smtpServer, smtpPort)
    {
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(smtpUsername, senderPassword),
        EnableSsl = true
    };

    using var mailMessage = new MailMessage
    {
        From = new MailAddress(senderEmail, "WebCampus Support"),
        Subject = subject,
        Body = body,
        IsBodyHtml = isBodyHtml
    };

    mailMessage.To.Add(to);

    if (!string.IsNullOrWhiteSpace(replyTo))
        mailMessage.ReplyToList.Add(new MailAddress(replyTo));

    await client.SendMailAsync(mailMessage, cancellationToken);
}
}
