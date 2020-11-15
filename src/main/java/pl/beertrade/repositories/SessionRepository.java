package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.beertrade.model.statistics.SessionEvent;

import java.util.Optional;
import java.util.UUID;

public interface SessionRepository extends CrudRepository<SessionEvent, UUID> {

    Optional<SessionEvent> findFirstByOrderByDateDesc();

}
