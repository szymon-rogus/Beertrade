package pl.beertrade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.beertrade.exception.TableException;
import pl.beertrade.model.table.Table;
import pl.beertrade.model.table.TableClientViewJTO;
import pl.beertrade.model.user.Client;
import pl.beertrade.repositories.ClientRepository;
import pl.beertrade.repositories.TableRepository;
import pl.beertrade.util.TableAssembler;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<TableClientViewJTO> getTableList() {
        final List<Table> tables = tableRepository.findAll();
        return tables.stream()
                .map(TableAssembler::toTableClientViewJTO)
                .collect(Collectors.toList());
    }

    public void chooseTable(Client client, int tableNumber) throws TableException {
        final Table table = tableRepository.findByTableNumber(tableNumber);
        table.addClientToTable(client);
        client.setTableNumber(tableNumber);
        tableRepository.save(table);
        clientRepository.save(client);
    }

    public void unreserveTable(Client client, int tableNumber) throws TableException {
        final Table table = tableRepository.findByTableNumber(tableNumber);
        table.removeClientFromTable(client);
        client.setTableNumber(null);
        tableRepository.save(table);
        clientRepository.save(client);
    }

}
