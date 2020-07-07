package pl.beertrade.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.beer.BoughtBeer;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends CrudRepository<BoughtBeer, UUID> {

    List<BoughtBeer> findAll();

    @Query("SELECT bb from BoughtBeer bb WHERE bb.beer = (SELECT b from Beer b WHERE b.name = :beerName)")
    BoughtBeer findByBeerName(@Param("beerName") String beerName);

}
