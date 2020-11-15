package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.statistics.enums.SessionType;
import pl.beertrade.services.SessionService;

@RestController
@RequestMapping("session")
@Slf4j
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @GetMapping
    public SessionType getLatestSessionType() throws NotFoundException {
        log.trace("ENTRY getLatestSessionType");
        final SessionType sessionType = sessionService.getLatestSessionType();
        log.trace("EXIT getLatestSessionType");
        return sessionType;
    }

    @PostMapping("/enable")
    public void enableSession() {
        log.trace("ENTRY enableSession");
        sessionService.toggleSession(true);
        log.trace("EXIT enableSession");
    }

    @PostMapping("/disable")
    public void disableSession() {
        log.trace("ENTRY enableSession");
        sessionService.toggleSession(false);
        log.trace("EXIT enableSession");
    }

    @DeleteMapping
    public void clearSession() {
        log.trace("ENTRY clearSession");
        sessionService.clearSession();
        log.trace("EXIT clearSession");
    }

}
