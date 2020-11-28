package pl.beertrade.model.beer.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Builder
public class PricesJTO {

    @JsonProperty
    @NonNull
    private final UUID checkStamp;

    @JsonProperty
    @NonNull
    private final Map<UUID, Double> prices;

}
