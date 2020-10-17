package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.services.RegistrationService;
import pl.beertrade.util.Decoder;

@RestController
@Slf4j
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        log.trace("ENTRY - register - {}", user);
        final Client client = Decoder.decodeClient(user);
        registrationService.saveClient(client);
        log.trace("EXIT - register - {}", client);
        return client;
    }

}
