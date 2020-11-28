package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.user.Client;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends CrudRepository<Order, UUID> {

    List<Order> findAll();

    List<Order> findByClientOrderByBoughtDateAsc(Client Client);

    void deleteById(UUID id);

    List<Order> findByOrderState(OrderState orderState);

    List<Order> findByBoughtDateAfter(Date dateAfter);

}
