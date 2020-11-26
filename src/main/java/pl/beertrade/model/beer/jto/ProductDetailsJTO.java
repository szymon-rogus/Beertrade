package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;
import pl.beertrade.model.beer.enums.ProductState;


@Builder
public class ProductDetailsJTO {

    @NonNull
    @JsonProperty
    private final String name;

    @NonNull
    @JsonProperty
    private final String type;

    @JsonProperty
    private final String description;

    @JsonProperty
    private final double price;

    @JsonProperty
    private final Integer ibu;

    @JsonProperty
    private final double blg;

    @JsonProperty
    private final Integer ebc;

    @JsonProperty
    private final String brewery;

    @JsonProperty
    private final String origin;

    @JsonProperty
    private final String year;

    @JsonProperty
    private final Double alcoholPercentage;

}
