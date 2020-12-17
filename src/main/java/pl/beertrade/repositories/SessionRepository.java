package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.statistics.SessionEvent;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRepository extends CrudRepository<SessionEvent, UUID> {

    Optional<SessionEvent> findFirstByOrderByDateDesc();

}
