package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;
import pl.beertrade.model.beer.enums.ProductState;

import java.util.UUID;

@Builder
public class ManageProductsListItemJTO {

    @JsonProperty
    private final UUID id;

    @JsonProperty
    @NonNull
    private final String name;

    @JsonProperty
    @NonNull
    private final String type;

    @JsonProperty
    @NonNull
    private final double alcoholPercentage;

    @JsonProperty
    private final String encodedPhoto;

    @JsonProperty
    @NonNull
    private final ProductState productState;

}
