package pl.beertrade.exception;

public class ClientAlreadyInTableException extends TableException {

    public ClientAlreadyInTableException(String message) {
        super(message);
    }

}
