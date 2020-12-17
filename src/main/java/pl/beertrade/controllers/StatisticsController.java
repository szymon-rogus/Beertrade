package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.model.statistics.jto.DateJTO;
import pl.beertrade.model.statistics.jto.DatePeriodJTO;
import pl.beertrade.model.statistics.jto.OwnerMainPageJTO;
import pl.beertrade.model.statistics.jto.ProductStatisticsJTO;
import pl.beertrade.services.StatisticsService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("statistics")
@Slf4j
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @PostMapping("/all")
    public OwnerMainPageJTO getOwnerMainPageData(@RequestBody DatePeriodJTO datePeriodJTO) throws ParseException {
        log.trace("ENTRY - getOwnerMainPageData - {}", datePeriodJTO);
        final Date dateFrom = new SimpleDateFormat("yyyy-MM-dd")
                .parse(datePeriodJTO.getDateFrom());
        final Date dateTo = new SimpleDateFormat("yyyy-MM-dd")
                .parse(datePeriodJTO.getDateTo());
        final OwnerMainPageJTO ownerMainPageJTO = statisticsService.getAllProductsStatisticsFromPeriod(dateFrom, dateTo);
        log.trace("EXIT - getOwnerMainPageData - {}", ownerMainPageJTO);
        return ownerMainPageJTO;
    }

    @PostMapping("/product/{id}")
    public ProductStatisticsJTO getProductStatistics(@RequestBody DateJTO dateJTO, @PathVariable("id") UUID productId) throws ParseException, NotFoundException {
        log.trace("ENTRY - getProductStatistics - {}", dateJTO);
        final Date date = new SimpleDateFormat("yyyy-MM-dd")
                .parse(dateJTO.getDate());
        final ProductStatisticsJTO productStatisticsJTO = statisticsService.getProductStatistics(date, productId);
        log.trace("EXIT - getProductStatistics - {}", productStatisticsJTO);
        return productStatisticsJTO;
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<String> handleException(Exception e) {
        log.warn(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

}
