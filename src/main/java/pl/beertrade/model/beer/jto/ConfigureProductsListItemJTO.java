package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
public class ConfigureProductsListItemJTO {
    @JsonProperty
    private final UUID id;

    @JsonProperty
    @NonNull
    private final String name;

    @JsonProperty
    @NotNull
    private final Double basePrice;

    @JsonProperty
    @NotNull
    private final Double minPrice;

    @JsonProperty
    @NotNull
    private final Double maxPrice;

    @JsonProperty
    private final Double amortizationFactor;
}

