package pl.beertrade.model.table;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.NotNull;

@Builder
public class TableClientViewJTO {

    @JsonProperty
    private final int tableNumber;

    @NotNull
    @JsonProperty
    private final String name;

    @JsonProperty
    private final int seats;

    @JsonProperty
    private final int occupiedSeats;

}
