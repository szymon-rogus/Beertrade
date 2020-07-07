package pl.beertrade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.TableException;
import pl.beertrade.exception.UserNotClientException;
import pl.beertrade.model.table.TableClientViewJTO;
import pl.beertrade.model.user.Client;
import pl.beertrade.services.TableService;
import pl.beertrade.util.UserContextProvider;

import java.util.List;

@RestController
@RequestMapping("table")
public class TableController {

    @Autowired
    private TableService tableService;

    @Autowired
    private UserContextProvider userContextProvider;

    @GetMapping("/list")
    public List<TableClientViewJTO> getTableList() {
        return tableService.getTableList();
    }

    @PostMapping("/reserve/{tableNumber}")
    public void chooseTable(@PathVariable int tableNumber) throws TableException, UserNotClientException {
        final Client client = userContextProvider.getUserAsClient();
        tableService.chooseTable(client, tableNumber);
    }

    @PostMapping("/unreserve/{tableNumber}")
    public void unreserveTable(@PathVariable int tableNumber) throws TableException, UserNotClientException {
        final Client client = userContextProvider.getUserAsClient();
        tableService.unreserveTable(client, tableNumber);
    }

}
