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

    @JsonProperty
    private final float alcoholPercentage;

    @NonNull
    @JsonProperty
    private final String brand;

    @NonNull
    @JsonProperty
    private final String color;

    @NonNull
    @JsonProperty
    private final String description;

    @NonNull
    @JsonProperty
    private final boolean onStore;

    @JsonProperty
    private final double price;

}
