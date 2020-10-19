package pl.beertrade.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.repositories.BoughtProductRepository;

import java.util.UUID;

@Service
@Slf4j
public class OrderService {

    @Autowired
    private BoughtProductRepository boughtProductRepository;

    public void deleteOrder(UUID id) {
        log.trace("ENTRY - deleteOrder - {}", id);
        boughtProductRepository.deleteById(id);
        log.trace("EXIT - deleteOrder");
    }

}
