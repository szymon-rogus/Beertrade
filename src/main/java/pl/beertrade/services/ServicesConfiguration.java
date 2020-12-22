package pl.beertrade.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.beertrade.services.prices.PricesAmorthizedModifierImpl;
import pl.beertrade.services.prices.PricesModifier;
import java.util.UUID;

import java.util.Properties;

@Configuration
public class ServicesConfiguration {

    @Bean
    public Properties emailProperties() {
        Properties prop = new Properties();
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", "smtp-relay.sendinblue.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.ssl.trust", "smtp-relay.sendinblue.com");
        return prop;
    }

    @Bean
    public PricesModifier<UUID> pricesModifier() {
        return PricesAmorthizedModifierImpl.apply();
    }

}
