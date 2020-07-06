package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.repositories.ClientRepository;
import pl.beertrade.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    public User getUserByUsername(String username) {
        return userRepository.findByLogin(username);
    }

    public Client getClientByUsername(String username) {
        return clientRepository.findByLogin(username);
    }

}
