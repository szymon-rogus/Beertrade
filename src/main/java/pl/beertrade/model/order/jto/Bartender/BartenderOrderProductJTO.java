package pl.beertrade.model.order.jto.Bartender;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Builder
@Data
public class BartenderOrderProductJTO {

    @JsonProperty
    @NonNull
    private UUID id;

    @JsonProperty
    @NonNull
    private Integer orderViewId;

    @JsonProperty
    @NonNull
    private String timeOrdered;

    @JsonProperty
    @NonNull
    private String beerName;

    @JsonProperty
    @NonNull
    private Integer amount;

    @JsonProperty
    @NonNull
    private Integer tableNumber;

    @JsonProperty
    @NonNull
    private String userLogin;

}
