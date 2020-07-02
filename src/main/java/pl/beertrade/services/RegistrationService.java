package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.UserRepository;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    public void saveClient(Client client) {

        userRepository.save(client);
    }

}
