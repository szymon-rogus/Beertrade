package pl.beertrade.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.TableException;
import pl.beertrade.model.table.Table;
import pl.beertrade.model.table.jto.TableClientViewJTO;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.ClientRepository;
import pl.beertrade.repositories.TableRepository;
import pl.beertrade.util.TableAssembler;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<TableClientViewJTO> getTableList() {
        log.trace("ENTRY - getTableList");
        final List<Table> tables = tableRepository.findAll();
        final List<TableClientViewJTO> tableClientViewJTOList = tables.stream()
                .map(TableAssembler::toTableClientViewJTO)
                .collect(Collectors.toList());
        log.trace("EXIT - getTableList - {}", tableClientViewJTOList);
        return tableClientViewJTOList;
    }

    public void chooseTable(Client client, int tableNumber) throws TableException {
        log.trace("ENTRY - chooseTable - {} {}", client, tableNumber);
        final Optional<Table> tableOptional = tableRepository.findByTableNumber(tableNumber);
        final Table table = tableOptional.orElseThrow(() ->
                new TableException(String.format("Table with number %d not found", tableNumber)));
        table.addClientToTable(client);
        client.setTableNumber(tableNumber);
        tableRepository.save(table);
        clientRepository.save(client);
        log.trace("EXIT - chooseTable");
    }

    public void unreserveTable(Client client, int tableNumber) throws TableException {
        log.trace("ENTRY - unreserveTable - {} {}", client, tableNumber);
        final Optional<Table> tableOptional = tableRepository.findByTableNumber(tableNumber);
        final Table table = tableOptional.orElseThrow(() ->
                new TableException(String.format("Table with number %d not found", tableNumber)));
        table.removeClientFromTable(client);
        client.setTableNumber(null);
        tableRepository.save(table);
        clientRepository.save(client);
        log.trace("EXIT - unreserveTable");
    }

}
