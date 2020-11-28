package pl.beertrade.model.order.jto.Client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import pl.beertrade.model.order.enums.OrderState;

import java.util.UUID;

@Builder
@Data
public class ClientOrderProductJTO {

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
    private OrderState orderState;

    @JsonProperty
    @NonNull
    private float totalPrice;

}
