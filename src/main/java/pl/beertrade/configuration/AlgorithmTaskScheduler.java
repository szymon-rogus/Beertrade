package pl.beertrade.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.beertrade.services.prices.PricesService;

@Component
public class AlgorithmTaskScheduler {

    @Autowired
    private PricesService pricesService;

    @Scheduled(fixedRate = 15000)
    public void countNewPrices() {
        pricesService.countNewPrices();
    }

}
