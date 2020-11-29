package pl.beertrade.services;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.beer.jto.PriceJTO;
import pl.beertrade.model.beer.jto.PricesJTO;
import pl.beertrade.services.prices.PricesModifier;
import pl.beertrade.services.prices.PricesService;

import javax.annotation.PostConstruct;
import java.lang.reflect.Type;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Semaphore;

@Service
@Slf4j
public class PricesServiceImpl implements PricesService {

    @Autowired
    private PricesModifier pricesModifier;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    private final Semaphore readBlock = new Semaphore(1);

    private final Semaphore writeBlock = new Semaphore(1);

    private final Semaphore readMutex = new Semaphore(1);

    private final Semaphore writeMutex = new Semaphore(1);

    private final Semaphore writePending = new Semaphore(1);

    private Integer readersCount = 0;

    private Integer writersCount = 0;

    private Map<UUID, Double> prices;

    private Instant lastOrderTimestamp;

    private UUID pricesCheckStamp = UUID.randomUUID();

    @PostConstruct
    public void init() {
        prices = productService.getBaseProductPrices();
        lastOrderTimestamp = Instant.now();
    }

    @Override
    public void countNewPrices() {
        final Map<Beer, Integer> buys = orderService.getProductBuysForIteration(lastOrderTimestamp);
        lastOrderTimestamp = Instant.now();
        final HashMap<UUID, Double> filteredPrices = new HashMap<>();
        final HashMap<UUID, Integer> mappedBuys = new HashMap<>();
        buys.keySet().forEach(key -> mappedBuys.put(key.getId(), buys.get(key)));
        try {
            writeMutex.acquire();
            writersCount++;
            if (writersCount == 1) {
                readBlock.acquire();
            }
            writeMutex.release();
            writeBlock.acquire();
            buys.keySet().forEach(key -> {
                if (prices.containsKey(key.getId())) {
                    filteredPrices.put(key.getId(), prices.get(key.getId()));
                } else {
                    filteredPrices.put(key.getId(), key.getBasePrice());
                }
            });
            prices = pricesModifier.countNewPrices(filteredPrices, mappedBuys);
            pricesCheckStamp = UUID.randomUUID();
            writeBlock.release();
            writeMutex.acquire();
            writersCount--;
            if (writersCount == 0) {
                readBlock.release();
            }
            writeMutex.release();
        } catch (InterruptedException e) {
            log.error("Error in thread managing in PriceServie: ", e);
        }
    }

    @Override
    public PricesJTO getPrices() {
        try {
            HashMap<UUID, Double> clonedPrices;
            UUID clonedCheckStamp;
            readLock();
            final Gson mapGson = new Gson();
            final Gson checkStampGson = new Gson();
            final String mapAsJson = mapGson.toJson(this.prices);
            final String checkStampAsJson = checkStampGson.toJson(this.pricesCheckStamp);
            final Type mapType = new TypeToken<HashMap<UUID, Double>>() {
            }.getType();
            final Type checkStampType = new TypeToken<UUID>() {
            }.getType();
            clonedPrices = mapGson.fromJson(mapAsJson, mapType);
            clonedCheckStamp = checkStampGson.fromJson(checkStampAsJson, checkStampType);
            readUnlock();
            return PricesJTO.builder()
                    .prices(clonedPrices)
                    .checkStamp(clonedCheckStamp)
                    .build();
        } catch (InterruptedException e) {
            log.error("Error in thread managing in PriceServie: ", e);
            return null;
        }
    }

    @Override
    public PriceJTO getPrice(UUID productId) {
        try {
            Double clonedPrice = null;
            UUID clonedCheckStamp = null;
            readLock();
            if (this.prices.containsKey(productId)) {
                final Gson priceGson = new Gson();
                final Gson checkStampGson = new Gson();
                final String priceAsJson = priceGson.toJson(this.prices.get(productId));
                final String checkStampAsJson = checkStampGson.toJson(this.pricesCheckStamp);
                final Type priceType = new TypeToken<Double>() {
                }.getType();
                final Type checkStampType = new TypeToken<UUID>() {
                }.getType();
                clonedPrice = priceGson.fromJson(priceAsJson, priceType);
                clonedCheckStamp = checkStampGson.fromJson(checkStampAsJson, checkStampType);
            }
            readUnlock();
            return PriceJTO.builder()
                    .price(clonedPrice)
                    .checkStamp(clonedCheckStamp)
                    .build();
        } catch (InterruptedException e) {
            log.error("Error in thread managing in PriceServie: ", e);
            return null;
        }
    }

    private void readLock() throws InterruptedException {
        writePending.acquire();
        readBlock.acquire();
        readMutex.acquire();
        readersCount++;
        if (readersCount == 1) {
            writeBlock.acquire();
        }
        readMutex.release();
        readBlock.release();
        writePending.release();
    }

    private void readUnlock() throws InterruptedException {
        readMutex.acquire();
        readersCount--;
        if (readersCount == 0) {
            writeBlock.release();
        }
        readMutex.release();
    }

}
