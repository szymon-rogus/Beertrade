package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.beer.BoughtBeer;
import pl.beertrade.model.user.Client;

import java.util.List;
import java.util.UUID;

@Repository
public interface BoughtProductRepository extends CrudRepository<BoughtBeer, UUID> {

    List<BoughtBeer> findAll();

    List<BoughtBeer> findByClientOrderByBoughtTimeAsc(Client Client);

}
