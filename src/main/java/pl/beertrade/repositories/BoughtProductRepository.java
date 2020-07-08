package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.beer.BoughtBeer;
import pl.beertrade.model.user.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BoughtProductRepository extends CrudRepository<BoughtBeer, UUID> {

    List<BoughtBeer> findAll();

    List<BoughtBeer> findByUserOrderByBoughtTimeAsc(User user);

}
