package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.services.OrderService;

import java.util.UUID;

@RestController
@RequestMapping("order")
@Slf4j
public class OrderController {

    @Autowired
    private OrderService orderService;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable UUID id) {
        log.trace("ENTRY - deleteOrder - {}", id);
        orderService.deleteOrder(id);
        log.trace("EXIT - deleteOrder");
        return ResponseEntity.ok()
                .build();
    }

}
