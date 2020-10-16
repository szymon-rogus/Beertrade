package pl.beertrade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.exception.UserNotFoundException;
import pl.beertrade.services.ForgottenPasswordService;

@RestController
@RequestMapping("forgottenpass")
public class ForgottenPasswordController {

    @Autowired
    private ForgottenPasswordService forgottenPasswordService;

    @PostMapping
    public void sendEmailWithPassword(@RequestBody String email) throws Exception {
        forgottenPasswordService.sendEmailWithPassword(email);
    }

}
