package pl.beertrade.model.beer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

@Builder
public class ProductListItemJTO {

    @JsonProperty
    @NonNull
    private final String name;

    @JsonProperty
    @NonNull
    private final String type;

    @JsonProperty
    @NonNull
    private final String brand;

    @JsonProperty
    private final double price;

}
