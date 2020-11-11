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

}
