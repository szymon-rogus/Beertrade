package pl.beertrade.model.statistics.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class OwnerMainPageJTO {

    @JsonProperty
    private Double overallIncome;

    @JsonProperty
    private Double overallAlgorithmIncome;

    @JsonProperty
    private List<ProductFinancialStatsJTO> productStats;

}
