package pl.beertrade.util;

import lombok.experimental.UtilityClass;
import pl.beertrade.model.table.Table;
import pl.beertrade.model.table.jto.TableClientViewJTO;

@UtilityClass
public class TableAssembler {

    public TableClientViewJTO toTableClientViewJTO(Table table) {
        final int occupiedSeats = table.getActualClients()
                .size();
        return TableClientViewJTO.builder()
                .name(table.getName())
                .tableNumber(table.getTableNumber())
                .seats(table.getSeats())
                .occupiedSeats(occupiedSeats)
                .build();
    }

}
