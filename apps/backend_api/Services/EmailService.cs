namespace backend_api.Services;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtpServer = _configuration["EmailSettings:Server"];
        var smtpPort = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
        var senderEmail = _configuration["EmailSettings:SenderEmail"];
        var senderPassword = _configuration["EmailSettings:SenderPassword"];

        using var client = new SmtpClient(smtpServer, smtpPort)
        {
            Credentials = new NetworkCredential(senderEmail, senderPassword),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(senderEmail!, "WebCampus Support"),
            Subject = subject,
            Body = body,
            IsBodyHtml = true // Permet d'envoyer du HTML (liens, styles, etc.)
        };
        
        mailMessage.To.Add(to);
        await client.SendMailAsync(mailMessage);
    }
}
