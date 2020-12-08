package pl.beertrade.model.statistics.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Builder
@Data
public class ProductFinancialStatsJTO {

    @JsonProperty
    @NonNull
    private UUID productId;

    @JsonProperty
    @NonNull
    private String productName;

    @JsonProperty
    @NonNull
    private Double productIncome;

    @JsonProperty
    @NonNull
    private Double algorithmIncome;

}
