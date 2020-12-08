package pl.beertrade.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.statistics.HistoricalOrder;
import pl.beertrade.model.statistics.jto.OwnerMainPageJTO;
import pl.beertrade.model.statistics.jto.ProductFinancialStatsJTO;
import pl.beertrade.repositories.HistoricalOrderRepository;
import pl.beertrade.repositories.ProductRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class StatisticsService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HistoricalOrderRepository historicalOrderRepository;

    public OwnerMainPageJTO getAllProductsStatisticsFromPeriod(Date dateFrom, Date dateTo) {
        log.trace("ENTRY - getAllProductsStatisticsFromPeriod - {} {}", dateFrom, dateTo);
        final List<Beer> products = productRepository.findAll();
        final List<ProductFinancialStatsJTO> productFinancialStatsList = products.stream()
                .map(product -> getProductFinancialStatsFromPeriod(product, dateFrom, dateTo))
                .collect(Collectors.toList());
        final OwnerMainPageJTO ownerMainPageJTO = countOverallStats(productFinancialStatsList);
        log.trace("EXIT - getAllProductsStatisticsFromPeriod - {}", ownerMainPageJTO);
        return ownerMainPageJTO;
    }

    public ProductFinancialStatsJTO getProductFinancialStatsFromPeriod(Beer product, Date dateFrom, Date dateTo) {
        log.trace("ENTRY - getProductsFinancialStats - {} {} {}", product, dateFrom, dateTo);
        final List<HistoricalOrder> historicalOrders = historicalOrderRepository.findAllByBoughtDateBetweenAndProduct(dateFrom, dateTo, product);
        final ProductFinancialStatsJTO productFinancialStats = countStatsForProduct(historicalOrders);
        if (productFinancialStats == null) {
            return ProductFinancialStatsJTO.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .productIncome(0.0)
                    .algorithmIncome(0.0)
                    .build();
        }
        log.trace("EXIT - getProductsFinancialStats - {}", productFinancialStats);
        return productFinancialStats;
    }

    private ProductFinancialStatsJTO countStatsForProduct(List<HistoricalOrder> historicalOrders) {
        if (historicalOrders.isEmpty()) {
            return null;
        }
        double productIncome = 0.0;
        double baseProductIncome = 0.0;
        for (HistoricalOrder historicalOrder : historicalOrders) {
            productIncome += historicalOrder.getPrice() * historicalOrder.getAmount();
            baseProductIncome += historicalOrder.getBasePrice() * historicalOrder.getAmount();
        }
        final Beer product = historicalOrders.get(0)
                .getProduct();
        final UUID productId = product.getId();
        final String productName = product.getName();
        return ProductFinancialStatsJTO.builder()
                .productId(productId)
                .productName(productName)
                .productIncome(productIncome)
                .algorithmIncome(productIncome - baseProductIncome)
                .build();
    }

    private OwnerMainPageJTO countOverallStats(List<ProductFinancialStatsJTO> productFinancialStatsList) {
        Double overallIncome = 0.0;
        Double overallAlgorithmIncome = 0.0;

        for (ProductFinancialStatsJTO productFinancialStats : productFinancialStatsList) {
            overallIncome += productFinancialStats.getProductIncome();
            overallAlgorithmIncome += productFinancialStats.getAlgorithmIncome();
        }

        return OwnerMainPageJTO.builder()
                .overallIncome(overallIncome)
                .overallAlgorithmIncome(overallAlgorithmIncome)
                .productStats(productFinancialStatsList)
                .build();
    }

}
