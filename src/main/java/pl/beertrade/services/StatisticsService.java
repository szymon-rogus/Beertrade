package pl.beertrade.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.statistics.HistoricalOrder;
import pl.beertrade.model.statistics.HistoricalPrices;
import pl.beertrade.model.statistics.jto.*;
import pl.beertrade.repositories.HistoricalOrderRepository;
import pl.beertrade.repositories.HistoricalPricesRepository;
import pl.beertrade.repositories.ProductRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
@Slf4j
public class StatisticsService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HistoricalOrderRepository historicalOrderRepository;

    @Autowired
    private HistoricalPricesRepository historicalPricesRepository;

    public OwnerMainPageJTO getAllProductsStatisticsFromPeriod(Date dateFrom, Date dateTo) {
        log.trace("ENTRY - getAllProductsStatisticsFromPeriod - {} {}", dateFrom, dateTo);
        final List<Beer> products = productRepository.findAll();
        final List<ProductFinancialStatsJTO> productFinancialStatsList = products.stream()
                .map(product -> getProductFinancialStatsFromPeriod(product, dateFrom, dateTo))
                .sorted((item1, item2) -> item1.getProductName().compareToIgnoreCase(item2.getProductName()))
                .collect(Collectors.toList());
        final OwnerMainPageJTO ownerMainPageJTO = countOverallStats(productFinancialStatsList);
        log.trace("EXIT - getAllProductsStatisticsFromPeriod - {}", ownerMainPageJTO);
        return ownerMainPageJTO;
    }

    public ProductFinancialStatsJTO getProductFinancialStatsFromPeriod(Beer product, Date dateFrom, Date dateTo) {
        log.trace("ENTRY - getProductsFinancialStats - {} {} {}", product, dateFrom, dateTo);
        final List<HistoricalOrder> historicalOrders = historicalOrderRepository.findAllByBoughtDateBetweenAndProductOrderByBoughtDateAsc(dateFrom, dateTo, product);
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

    public ProductStatisticsJTO getProductStatistics(Date dateFrom, Date dateTo, UUID productId) throws NotFoundException {
        log.trace("ENTRY - getProductStatistics - {} {} {}", dateFrom, dateTo, productId);
        final Beer product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(Beer.class.getName(), productId.toString()));

        final LocalDate dateFromLocal = dateFrom.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        final LocalDate dateToLocal = dateTo.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        long numberOfDays = DAYS.between(dateFromLocal, dateToLocal);
        long numberOfMinutesInterval = 15 * (numberOfDays + 1);

        final Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateFrom);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        final Date startDate = calendar.getTime();
        if (numberOfDays == 0) {
            calendar.add(Calendar.HOUR_OF_DAY, 24);
        } else {
            calendar.add(Calendar.DATE, Math.toIntExact(numberOfDays) + 1);
        }
        final Date endDate = calendar.getTime();
        final List<ArchivedDemandInfoJTO> archivedDemandInfoJTOList = new ArrayList<>();
        final List<ArchivedPriceInfoJTO> archivedPriceInfoJTOList = new ArrayList<>();
        Calendar iterCalendar = Calendar.getInstance();
        final DateFormat resultDateFormatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        final List<HistoricalOrder> historicalOrders = historicalOrderRepository.findAllByBoughtDateBetweenAndProductOrderByBoughtDateAsc(startDate, endDate, product);
        final List<HistoricalPrices> historicalPricesList = historicalPricesRepository.findAllByDateBetweenAndProductOrderByDateAsc(startDate, endDate, product);

        int historicalOrdersIterator = 0;
        int historicalPricesIterator = 0;
        double sum = 0.0;
        double listSize = 0;
        int number = 0;
        for (iterCalendar.setTime(startDate); iterCalendar.getTime().before(endDate); iterCalendar.add(Calendar.MINUTE, Math.toIntExact(numberOfMinutesInterval))) {
            final Date iterDate = iterCalendar.getTime();
            final Calendar nextCalendarDate = Calendar.getInstance();
            nextCalendarDate.setTime(iterDate);
            nextCalendarDate.add(Calendar.MINUTE, Math.toIntExact(numberOfMinutesInterval));
            final Date dateAfter = nextCalendarDate.getTime();
            for (int j = historicalOrdersIterator; j < historicalOrders.size() && historicalOrderDateInRange(historicalOrders.get(j), iterDate, dateAfter); j++) {
                number += historicalOrders.get(j).getAmount();
                historicalOrdersIterator = j;
            }

            for (int j = historicalPricesIterator; j < historicalPricesList.size() && historicalPriceDateInRange(historicalPricesList.get(j), iterDate, dateAfter); j++) {
                listSize++;
                sum += historicalPricesList.get(j)
                        .getPrice();
                historicalPricesIterator = j + 1;
            }
            final ArchivedDemandInfoJTO archivedDemandInfo = ArchivedDemandInfoJTO.builder()
                    .demandValue(number)
                    .time(resultDateFormatter.format(dateAfter))
                    .build();
            if (listSize != 0) {
                final ArchivedPriceInfoJTO archivedPriceInfoJTO = ArchivedPriceInfoJTO.builder()
                        .priceValue(sum / listSize)
                        .time(resultDateFormatter.format(dateAfter))
                        .build();
                archivedPriceInfoJTOList.add(archivedPriceInfoJTO);
            }
            archivedDemandInfoJTOList.add(archivedDemandInfo);
            if (historicalOrdersIterator == historicalOrders.size() - 1 && historicalPricesIterator == historicalPricesList.size() - 1) {
                break;
            }
            number = 0;
            sum = 0.0;
            listSize = 0;
        }
        final ProductFinancialStatsJTO productFinancialStatsJTO = getProductFinancialStatsFromPeriod(product, startDate, endDate);
        final ProductStatisticsJTO productStatisticsJTO = ProductStatisticsJTO.builder()
                .productFinancialStats(productFinancialStatsJTO)
                .archivedPriceInfoList(archivedPriceInfoJTOList)
                .archivedDemandInfoList(archivedDemandInfoJTOList)
                .build();
        log.trace("EXIT - getProductStatistics - {}", productStatisticsJTO);
        return productStatisticsJTO;
    }

    private boolean historicalOrderDateInRange(HistoricalOrder historicalOrder, Date dateBefore, Date dateAfter) {
        return historicalOrder.getBoughtDate().before(dateAfter) && historicalOrder.getBoughtDate().after(dateBefore);
    }

    private boolean historicalPriceDateInRange(HistoricalPrices historicalPrices, Date dateBefore, Date dateAfter) {
        return historicalPrices.getDate().before(dateAfter) && (historicalPrices.getDate().after(dateBefore) || dateBefore.toInstant().getEpochSecond() == historicalPrices.getDate().toInstant().getEpochSecond());
    }

    public void archivePrices(Map<UUID, Double> prices) {
        final Date archiveDate = Date.from(Instant.now());
        final List<HistoricalPrices> historicalPricesList = new ArrayList<>();
        prices.forEach((id, price) -> {
            try {
                final Beer product = productRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException(Beer.class.getName(), id.toString()));
                final HistoricalPrices historicalPrices = HistoricalPrices.builder()
                        .id(UUID.randomUUID())
                        .product(product)
                        .price(price)
                        .date(archiveDate)
                        .build();
                historicalPricesList.add(historicalPrices);
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        });
        historicalPricesRepository.saveAll(historicalPricesList);
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
