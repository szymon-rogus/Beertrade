package pl.beertrade.exception;

public class NotFoundException extends Exception {

    public NotFoundException(String email) {
        super(String.format("User with \"%s\" email is not registered", email));
    }

    public NotFoundException(String clazz, String id) {
        super(String.format("Class %s with id %s not found", clazz, id));
    }

}
