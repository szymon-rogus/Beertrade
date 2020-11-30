package pl.beertrade.util;

import lombok.experimental.UtilityClass;
import pl.beertrade.model.table.Table;
import pl.beertrade.model.table.jto.TableClientViewJTO;

@UtilityClass
public class TableAssembler {

    public TableClientViewJTO toTableClientViewJTO(Table table) {
        if (table == null) {
            return TableClientViewJTO.emptyTableClientViewJTO();
        }
        final int occupiedSeats = table.getActualClients()
                .size();
        return TableClientViewJTO.builder()
                .tableNumber(table.getTableNumber())
                .seats(table.getSeats())
                .occupiedSeats(occupiedSeats)
                .build();
    }

}
