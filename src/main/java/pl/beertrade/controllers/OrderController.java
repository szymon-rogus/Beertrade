package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.order.jto.BartenderOrderProductJTO;
import pl.beertrade.model.order.jto.BartenderStatisticsJTO;
import pl.beertrade.services.OrderService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("order")
@Slf4j
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable UUID id) throws NotFoundException {
        log.trace("ENTRY - deleteOrder - {}", id);
        orderService.processOrder(id, OrderState.CANCELLED);
        log.trace("EXIT - deleteOrder");
        return ResponseEntity.ok()
                .build();
    }

    @PostMapping("/execute/{id}")
    public ResponseEntity<?> executeOrder(@PathVariable UUID id) throws NotFoundException {
        log.trace("ENTRY - executeOrder - {}", id);
        orderService.processOrder(id, OrderState.DONE);
        log.trace("EXIT - executeOrder");
        return ResponseEntity.ok()
                .build();
    }

    @PostMapping("/restore/{id}")
    public ResponseEntity<?> restoreOrder(@PathVariable UUID id) throws NotFoundException {
        log.trace("ENTRY - restoreOrder - {}", id);
        orderService.processOrder(id, OrderState.WAITING);
        log.trace("EXIT - restoreOrder");
        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/waiting")
    public List<BartenderOrderProductJTO> getWaitingOrders() {
        log.trace("ENTRY - getAllOrderedProducts");
        final List<BartenderOrderProductJTO> orderedProductList = orderService.getWaitingOrders();
        log.trace("EXIT - getAllOrderedProducts - {}", orderedProductList);
        return orderedProductList;
    }

    @GetMapping("/bartenderStats")
    public BartenderStatisticsJTO getBartenderStatistics() {
        log.trace("ENTRY - getBartenderStatistics");
        final BartenderStatisticsJTO bartenderStatistics = orderService.getBartenderStatistics();
        log.trace("EXIT - getBartenderStatistics - {}", bartenderStatistics);
        return bartenderStatistics;
    }

}
