package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.model.statistics.jto.DatePeriodJTO;
import pl.beertrade.model.statistics.jto.OwnerMainPageJTO;
import pl.beertrade.services.StatisticsService;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;

@RestController
@RequestMapping("statistics")
@Slf4j
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @PostMapping("/all")
    public OwnerMainPageJTO getOwnerMainPageData(@RequestBody DatePeriodJTO datePeriodJTO) throws ParseException {
        log.trace("ENTRY - getOwnerMainPageData");
        final Date dateFrom = DateFormat.getDateInstance()
                .parse(datePeriodJTO.getDateFrom());
        final Date dateTo = DateFormat.getDateInstance()
                .parse(datePeriodJTO.getDateTo());
        final OwnerMainPageJTO ownerMainPageJTO = statisticsService.getAllProductsStatisticsFromPeriod(dateFrom, dateTo);
        log.trace("EXIT - getOwnerMainPageData - {}", ownerMainPageJTO);
        return ownerMainPageJTO;
    }

}
