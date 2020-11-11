package pl.beertrade.exception;

public class NotFoundException extends Exception {

    public NotFoundException(String clazz, String id) {
        super(String.format("Class %s with id %s not found", clazz, id));
    }

}
