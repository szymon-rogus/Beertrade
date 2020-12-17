package pl.beertrade.model.statistics.jto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ProductStatisticsJTO {

    @JsonProperty
    private ProductFinancialStatsJTO productFinancialStats;

    @JsonProperty
    private List<ArchivedPriceInfoJTO> archivedPriceInfoList;

    @JsonProperty
    private List<ArchivedDemandInfoJTO> archivedDemandInfoList;

}
