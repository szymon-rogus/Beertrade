package pl.beertrade.model.statistics.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DatePeriodJTO {

    @JsonProperty
    private String dateFrom;

    @JsonProperty
    private String dateTo;

}
