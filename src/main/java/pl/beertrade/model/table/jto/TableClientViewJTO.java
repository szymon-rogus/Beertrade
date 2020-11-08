package pl.beertrade.model.table.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.NotNull;

@Builder
public class TableClientViewJTO {

    @JsonProperty
    private final int tableNumber;

    @JsonProperty
    private final int seats;

    @JsonProperty
    private final int occupiedSeats;

}
