package pl.beertrade.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.beertrade.model.table.Table;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TableRepository extends CrudRepository<Table, UUID> {

    List<Table> findAll();

    Optional<Table> findByTableNumber(int tableNumber);

}
