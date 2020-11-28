package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.order.jto.BartenderOrderProductJTO;
import pl.beertrade.model.order.jto.BartenderStatisticsJTO;
import pl.beertrade.repositories.OrderRepository;
import pl.beertrade.repositories.ProductRepository;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public void processOrder(@NonNull UUID id, @NonNull OrderState state) throws NotFoundException {
        log.trace("ENTRY - processOrder - {}", id);
        final Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Order.class.getName(), id.toString()));
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

    public Map<UUID, Integer> getProductBuysForIteration(Instant lastOrderTimestamp) {
        final List<Order> newOrders = orderRepository.findByBoughtDateAfter(Date.from(lastOrderTimestamp));
        final Map<UUID, Integer> buys = new HashMap<>();
        newOrders.forEach(order -> incrementOrCreateBuys(order.getProduct().getId(), order.getAmount(), buys));
        fillMissingProducts(buys);
        return buys;
    }

    private void incrementOrCreateBuys(UUID productId, Integer amount, Map<UUID, Integer> buys) {
        Integer recentAmount = 0;
        if(buys.containsKey(productId)) {
            recentAmount = buys.get(productId);
        }
        recentAmount += amount;
        buys.put(productId, recentAmount);
    }

    private void fillMissingProducts(Map<UUID, Integer> newBuys) {
        final List<Beer> products = productRepository.findAll();
        products.forEach(product -> {
            if (!newBuys.containsKey(product.getId())) {
                newBuys.put(product.getId(), 0);
            }
        });
    }

}
