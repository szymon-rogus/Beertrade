package pl.beertrade.model.statistics.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ArchivedPriceInfoJTO {

    @JsonProperty
    private String time;

    @JsonProperty
    private Double priceValue;

}
