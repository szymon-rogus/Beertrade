package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.services.RegistrationService;
import pl.beertrade.util.Decoder;

@RestController
@Slf4j
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody User user) throws DataIntegrityViolationException, ConstraintViolationException {
        log.trace("ENTRY - register - {}", user);
        final Client client = Decoder.decodeClient(user);
        registrationService.saveClient(client);
        log.trace("EXIT - register - {}", client);
        return ResponseEntity.ok(client);
    }

    @ExceptionHandler({ Exception.class})
    public ResponseEntity<String> handleAuthenticationException(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(e.getMessage());
    }

}
