package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

import java.util.UUID;

@Builder
public class BartenderOrderProductJTO {

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
    private final String brand;

    @JsonProperty
    @NonNull
    private final String userLogin;

    @JsonProperty
    @NonNull
    private final Integer tableNumber;

}
