package pl.beertrade.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.statistics.SessionEvent;
import pl.beertrade.model.statistics.enums.SessionType;
import pl.beertrade.repositories.OrderRepository;
import pl.beertrade.repositories.SessionRepository;

import java.sql.Date;
import java.time.Instant;
import java.util.UUID;

@Service
@Slf4j
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private OrderRepository orderRepository;

    public SessionType getLatestSessionType() throws NotFoundException {
        log.trace("ENTRY getLatestSessionType");
        final SessionEvent sessionEvent = sessionRepository.findFirstByOrderByDateDesc()
                .orElseThrow(() -> new NotFoundException(SessionEvent.class.getName(), null));
        final SessionType sessionType = sessionEvent.getType();
        log.trace("EXIT getLatestSessionType - {}", sessionType);
        return sessionType;
    }

    public void toggleSession(boolean enable) {
        log.trace("ENTRY toggleSession - {}", enable);
        final SessionEvent sessionEvent = SessionEvent.builder()
                .id(UUID.randomUUID())
                .type(enable ? SessionType.START : SessionType.END)
                .date(Date.from(Instant.now()))
                .build();
        sessionRepository.save(sessionEvent);
        log.trace("EXIT toggleSession");
    }

    public void clearSession() {
        log.trace("ENTRY clearSession");
        orderRepository.deleteAll();
        log.trace("EXIT clearSession");
    }

}
