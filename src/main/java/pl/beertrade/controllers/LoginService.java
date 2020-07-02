package pl.beertrade.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.model.HelloBean;

@RestController
public class LoginService {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public HelloBean loginPage() {
        return new HelloBean("Hello man!");
    }
}
