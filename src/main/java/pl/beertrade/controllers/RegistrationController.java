package pl.beertrade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.services.RegistrationService;
import pl.beertrade.util.Decoder;

@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        System.out.println("Registration " + user.getLogin());
        final Client client = Decoder.decodeClient(user);
        registrationService.saveClient(client);
    }

}
