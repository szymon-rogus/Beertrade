package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;
import pl.beertrade.model.beer.enums.ProductState;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
public class FullProductJTO {

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


    @NotNull @JsonProperty
    private final Integer ibu;
    @JsonProperty
    private final Double blg;
    @JsonProperty
    private final Integer ebc;
    @JsonProperty
    private final String origin;
    @JsonProperty
    private final String brewery;
    @JsonProperty
    private final String year;

    @JsonProperty
    private final String description;

    @NotNull
    @JsonProperty
    private final Double basePrice;

    @NotNull
    @JsonProperty
    private final Double minPrice;

    @NotNull
    @JsonProperty
    private final Double maxPrice;
    @JsonProperty
    private final Double amortizationFactor;

}
