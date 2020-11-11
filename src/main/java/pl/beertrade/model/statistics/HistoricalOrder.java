package pl.beertrade.model.statistics;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.user.Client;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Entity
@Builder
@Table(name = "HISTORICAL_ORDER")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@ToString
public class HistoricalOrder {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    private Double basePrice;

    @NotNull
    private Date boughtDate;

    @NotNull
    @OneToOne
    @JoinColumn(name = "PRODUCT_ID", referencedColumnName = "ID")
    private Beer product;

    @NotNull
    private float price;

    @NotNull
    private Integer amount;

    @ManyToOne
    private Client client;
}
