package pl.beertrade.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.beer.enums.ProductState;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.order.jto.Bartender.BartenderOrderProductJTO;
import pl.beertrade.model.order.jto.Bartender.BartenderStatisticsJTO;
import pl.beertrade.model.order.jto.Client.ClientOrderProductJTO;
import pl.beertrade.model.user.Client;
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

    public Map<Beer, Integer> getProductBuysForIteration(Instant lastOrderTimestamp) {
        final List<Order> newOrders = orderRepository.findByBoughtDateAfter(Date.from(lastOrderTimestamp));
        final List<Order> disabledProductsFilteredOrders = newOrders.stream()
                .filter(order -> order.getProduct()
                .getProductState().equals(ProductState.ON_STORE))
                .collect(Collectors.toList());
        final Map<Beer, Integer> buys = new HashMap<>();
        disabledProductsFilteredOrders.forEach(order -> incrementOrCreateBuys(order.getProduct(), order.getAmount(), buys));
        fillMissingProducts(buys);
        return buys;
    }

    private void incrementOrCreateBuys(Beer product, Integer amount, Map<Beer, Integer> buys) {
        Integer recentAmount = 0;
        if(buys.containsKey(product)) {
            recentAmount = buys.get(product);
        }
        recentAmount += amount;
        buys.put(product, recentAmount);
    }

    private void fillMissingProducts(Map<Beer, Integer> newBuys) {
        final List<Beer> products = productRepository.findAll();
        products.forEach(product -> {
            if (product.getProductState().equals(ProductState.ON_STORE) && !newBuys.containsKey(product)) {
                newBuys.put(product, 0);
            }
        });
    }

    public List<ClientOrderProductJTO> clientOrders(Client client) {
        log.trace("ENTRY - getClientOrders");
        final List<ClientOrderProductJTO> orderedProducts = orderRepository.findByClientOrderByBoughtDateAsc(client)
                .stream()
                .map(Order::toClientOrderProductJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getClientOrders - {}", orderedProducts);
        return orderedProducts;

    }
}
