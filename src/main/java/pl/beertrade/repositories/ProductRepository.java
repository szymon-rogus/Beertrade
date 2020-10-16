package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.beer.Beer;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends CrudRepository<Beer, UUID> {

    List<Beer> findAll();

    Optional<Beer> findByName(String beerName);

    Optional<Beer> findById(UUID id);

}
