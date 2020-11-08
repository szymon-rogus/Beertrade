package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.OrderNotFoundException;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.order.jto.BartenderOrderProductJTO;
import pl.beertrade.model.order.jto.BartenderStatisticsJTO;
import pl.beertrade.repositories.OrderRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void processOrder(@NonNull UUID id, @NonNull OrderState state) throws OrderNotFoundException {
        log.trace("ENTRY - processOrder - {}", id);
        final Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
        order.setOrderState(state);
        orderRepository.save(order);
        log.trace("EXIT - processOrder");
    }

    public List<BartenderOrderProductJTO> getWaitingOrders() {
        log.trace("ENTRY - getWaitingOrders");
        final List<BartenderOrderProductJTO> orderedProducts = orderRepository.findByOrderState(OrderState.WAITING)
                .stream()
                .map(Order::toBartenderOrderProductJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getWaitingOrders - {}", orderedProducts);
        return orderedProducts;
    }

    public BartenderStatisticsJTO getBartenderStatistics() {
        log.trace("ENTRY - getBartenderStatistics");
        final List<Order> allOrders = orderRepository.findAll();
        final long ordersDone = allOrders.stream()
                .filter(order -> order.getOrderState()
                        .equals(OrderState.DONE))
                .count();
        final long ordersCancelled = allOrders.stream()
                .filter(order -> order.getOrderState()
                .equals(OrderState.CANCELLED))
                .count();
        return BartenderStatisticsJTO.builder()
                .done(ordersDone)
                .cancelled(ordersCancelled)
                .build();
    }

}
