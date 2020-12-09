package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.statistics.HistoricalOrder;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface HistoricalOrderRepository extends CrudRepository<HistoricalOrder, UUID> {

    List<HistoricalOrder> findAllByBoughtDateBetweenAndProduct(Date dateFrom, Date dateTo, Beer product);

}
