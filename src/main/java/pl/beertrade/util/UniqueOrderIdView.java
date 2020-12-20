package pl.beertrade.util;

import lombok.Getter;
import lombok.Setter;
import pl.beertrade.repositories.OrderRepository;

import java.util.concurrent.locks.ReentrantLock;

@Getter
@Setter
public final class UniqueOrderIdView {
    private static ReentrantLock globalLock = new ReentrantLock();
    private static int counter = 0;

    public static int getUniqueOrderId(OrderRepository orderRepository) {
        globalLock.lock();
        try {
            counter = orderRepository.findAll().size() + 1;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            globalLock.unlock();
        }
        return counter;
    }
}
