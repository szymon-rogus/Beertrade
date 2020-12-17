package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.statistics.HistoricalPrices;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface HistoricalPricesRepository extends CrudRepository<HistoricalPrices, UUID> {

    List<HistoricalPrices> findAllByDateBetweenAndProductOrderByDateAsc(Date dateFrom, Date dateTo, Beer product);

}
