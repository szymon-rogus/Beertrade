package pl.beertrade.util;

import lombok.Getter;
import lombok.Setter;

import java.util.concurrent.locks.ReentrantLock;

@Getter
@Setter
public final class UniqueOrderIdView {
    private static ReentrantLock globalLock = new ReentrantLock();
    private static int counter = 0;

    public static int getUniqueOrderId() {
        globalLock.lock();
        try {
            counter++;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            globalLock.unlock();
        }
        return counter;
    }
}
