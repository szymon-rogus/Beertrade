package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.beertrade.model.beer.jto.PriceJTO;
import pl.beertrade.model.beer.jto.PricesJTO;
import pl.beertrade.services.prices.PricesService;

import java.util.UUID;

@RestController
@RequestMapping("price")
@Slf4j
public class PricesController {

    @Autowired
    private PricesService pricesService;

    @GetMapping("/all")
    public PricesJTO getAllPrices() {
        log.trace("ENTRY - getAllPrices");
        final PricesJTO pricesJTO = pricesService.getPrices();
        log.trace("EXIT - getAllPrices - {}", pricesJTO);
        return pricesJTO;
    }

    @GetMapping("/{id}")
    public PriceJTO getPrice(@PathVariable UUID id) {
        log.trace("ENTRY - getPrice");
        final PriceJTO priceJTO = pricesService.getPrice(id);
        log.trace("EXIT - getPrice - {}", priceJTO);
        return priceJTO;
    }

}
