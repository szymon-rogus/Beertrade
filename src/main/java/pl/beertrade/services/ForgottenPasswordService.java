package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.UserNotFoundException;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.ClientRepository;
import pl.beertrade.util.Decoder;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.validation.constraints.NotNull;
import java.util.Properties;
import java.util.Random;

@Service
public class ForgottenPasswordService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private Properties emailProperties;

    public void sendEmailWithPassword(@NotNull String email) throws Exception {
        final Client client = clientRepository.findByEmail(email);
        if (client == null) {
            throw new UserNotFoundException();
        }
        final String randomPassword = generateRandomPassword();
        client.setPassword(Decoder.encodeBcrypt(randomPassword));
        clientRepository.save(client);
        final Session session = Session.getInstance(emailProperties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("bartekeragon@gmail.com", "3AEF43388222BCA3B982F1650D55CDE829CF");
            }
        });
        final Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress("bartekeragon@gmail.com"));
        message.setSubject("New Password!");
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        final String body = String.format("Your new password: %s", randomPassword);
        final MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(body, "text/html");
        final Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        message.setContent(multipart);
        Transport.send(message);
    }

    private String generateRandomPassword() {
        final int leftLimit = 48;
        final int rightLimit = 122;
        final int targetStringLength = 10;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

}
