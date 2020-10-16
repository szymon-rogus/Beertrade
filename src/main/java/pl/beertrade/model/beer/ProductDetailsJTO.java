package pl.beertrade.model.beer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;


@Builder
public class ProductDetailsJTO {

    @NonNull
    @JsonProperty
    private final String name;

    @NonNull
    @JsonProperty
    private final String type;

    @NonNull
    @JsonProperty
    private final String brand;

    @JsonProperty
    private final String description;

    @NonNull
    @JsonProperty
    private final boolean onStore;

    @JsonProperty
    private final double price;

}
