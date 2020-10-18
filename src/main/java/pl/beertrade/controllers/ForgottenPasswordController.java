package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.UserNotFoundException;
import pl.beertrade.services.ForgottenPasswordService;

import java.util.Arrays;

@RestController
@RequestMapping("forgottenpass")
@Slf4j
public class ForgottenPasswordController {

    @Autowired
    private ForgottenPasswordService forgottenPasswordService;

    @PostMapping
    public void sendEmailWithPassword(@RequestBody String email) throws Exception {
        log.trace("ENTRY - sendEmailWithPassword - {}", email);
        forgottenPasswordService.sendEmailWithPassword(email);
        log.trace("EXIT - sendEmailWithPassword");
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<String> handleException(Exception e) {
        log.warn(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

}
