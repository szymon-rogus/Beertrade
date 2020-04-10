package pl.beertrade.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@Slf4j
public class MyController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String toIndex() {
        log.info("Redirecting to index.html");
        return "index.html";
    }

}
