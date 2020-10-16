package pl.beertrade.exception;

public class BeerNotFoundException extends TableException {

    public BeerNotFoundException(String message) {
        super(message);
    }

}
