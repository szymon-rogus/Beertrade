package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

import java.util.UUID;

@Builder
public class OrderedProductListItemJTO {

    @JsonProperty
    private final UUID id;

    @JsonProperty
    @NonNull
    private final String name;

    @JsonProperty
    @NonNull
    private final String type;

    @JsonProperty
    private final double price;

}
