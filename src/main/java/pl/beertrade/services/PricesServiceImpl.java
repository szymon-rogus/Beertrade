package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import pl.beertrade.services.prices.PricesModifier;
//import pl.beertrade.services.prices.PricesService;

import java.util.Map;
import java.util.UUID;

@Service
public class PricesServiceImpl /*implements PricesService*/ {

    //@Autowired
    //private PricesModifier pricesModifier;

    private Map<UUID, Double> prices;

    //@Override
    public void countNewPrices() {
        synchronized (prices) {

        }
    }

    //@Override
    public void getPrices() {

    }

}
