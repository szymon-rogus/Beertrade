package pl.beertrade.model.order.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;

@Builder
public class BartenderStatisticsJTO {

    @JsonProperty
    @NonNull
    private final Long done;

    @JsonProperty
    private final Long cancelled;
}
