package pl.beertrade.exception;

import java.util.UUID;

public class OrderNotFoundException extends Exception {

    public OrderNotFoundException(UUID id) {
        super(String.format("Order with id %s not found", id));
    }

}
