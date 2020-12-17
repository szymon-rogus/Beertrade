package pl.beertrade.model.statistics.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DateJTO {

    @JsonProperty
    private String date;

}
