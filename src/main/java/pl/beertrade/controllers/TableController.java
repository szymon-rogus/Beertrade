package pl.beertrade.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.beertrade.exception.NotFoundException;
import pl.beertrade.exception.TableException;
import pl.beertrade.model.table.jto.TableClientViewJTO;
import pl.beertrade.model.user.Client;
import pl.beertrade.services.TableService;
import pl.beertrade.util.TableAssembler;
import pl.beertrade.util.UserContextProvider;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("table")
@Slf4j
public class TableController {

    @Autowired
    private TableService tableService;

    @Autowired
    private UserContextProvider userContextProvider;

    @GetMapping("/reservable")
    public List<TableClientViewJTO> getTableList() throws NotFoundException {
        log.trace("ENTRY - getTableList");
        final List<TableClientViewJTO> tableList = tableService.getReservableTableList( userContextProvider.getUserAsClient());
        log.trace("EXIT - getTableList - {}", tableList);
        return tableList;
    }

    @PostMapping("/reserve/{tableNumber}")
    public void chooseTable(@PathVariable int tableNumber) throws TableException, NotFoundException {
        log.trace("ENTRY - chooseTable");
        final Client client = userContextProvider.getUserAsClient();
        tableService.chooseTable(client, tableNumber);
        log.trace("EXIT - chooseTable");
    }

    @GetMapping
    public TableClientViewJTO getTable() throws NotFoundException {
        return TableAssembler.toTableClientViewJTO(userContextProvider.getUserAsClient().getTable());
    }

    @PostMapping("/unreserve")
    public void unreserveTable() throws TableException, NotFoundException {
        log.trace("ENTRY - unreserveTable");
        final Client client = userContextProvider.getUserAsClient();
        tableService.unreserveTable(client);
        log.trace("EXIT - unreserveTable");
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<String> handleException(Exception e) {
        log.warn(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

}
