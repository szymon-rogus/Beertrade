package pl.beertrade.exception;

public class ProductNotFoundException extends TableException {

    public ProductNotFoundException(String message) {
        super(message);
    }

}
