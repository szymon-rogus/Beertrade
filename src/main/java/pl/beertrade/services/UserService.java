package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.UserNotFoundException;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.repositories.ClientRepository;
import pl.beertrade.repositories.UserRepository;

import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    public User getUserByUsername(@NonNull String username) throws UserNotFoundException {
        log.trace("ENTRY - getUserByUsername - {}", username);
        final Optional<User> userOptional = userRepository.findByLogin(username);
        final User user = userOptional.orElseThrow(() ->
                new UserNotFoundException(String.format("User with username: %s not found", username)));
        log.trace("EXIT - getUserByUsername - {}", user);
        return user;
    }

    public Client getClientByUsername(@NonNull String username) throws UserNotFoundException {
        log.trace("ENTRY - getClientByUsername - {}", username);
        final Optional<Client> clientOptional = clientRepository.findByLogin(username);
        final Client client = clientOptional.orElseThrow(() ->
                new UserNotFoundException(String.format("Client with username: %s not found", username)));
        log.trace("EXIT - getClientByUsername - {}", client);
        return client;
    }

}
