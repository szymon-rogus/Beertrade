package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.UserRepository;

@Service
@Slf4j
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    public void saveClient(@NonNull Client client) {
        log.trace("ENTRY - saveClient - {}", client);
        userRepository.save(client);
        log.trace("EXIT - saveClient");
    }

}
