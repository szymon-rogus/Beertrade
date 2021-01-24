package pl.beertrade.model.table.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public class TableClientViewJTO {

    @JsonProperty
    private final Integer tableNumber;

    @JsonProperty
    private final Integer seats;

    @JsonProperty
    private final Integer occupiedSeats;

    public static TableClientViewJTO emptyTableClientViewJTO() {
        return TableClientViewJTO.builder().occupiedSeats(null)
                .tableNumber(null)
                .seats(null)
                .build();
    }

}
