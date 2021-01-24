package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

import java.util.UUID;

@Builder
public class PriceJTO {

    @JsonProperty
    @NonNull
    private final UUID checkStamp;

    @JsonProperty
    @NonNull
    private final Double price;

}
