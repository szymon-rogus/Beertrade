package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.ClientRepository;
import pl.beertrade.util.Decoder;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

@Service
public class ForgottenPasswordService {

    private static final String EMAIL_FROM = "bartekeragon1@gmail.com";

    private static final String PASSWORD = "0rdkz2fLn4cjO3Nt";

    private static final String SUBJECT = "New Password!";

    private static final String BODY = "Your new password: %s";

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private Properties emailProperties;

    public void sendEmailWithPassword(@NotNull String email) throws Exception {
        final Optional<Client> clientOptional = clientRepository.findByEmail(email);
        final Client client = clientOptional.orElseThrow(() -> new NotFoundException(email));
        final String randomPassword = generateRandomPassword();
        client.setPassword(Decoder.encodeBcrypt(randomPassword));
        clientRepository.save(client);
        final Session session = Session.getInstance(emailProperties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(EMAIL_FROM, PASSWORD);
            }
        });
        final Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(EMAIL_FROM));
        message.setSubject(SUBJECT);
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        final String body = String.format(BODY, randomPassword);
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
