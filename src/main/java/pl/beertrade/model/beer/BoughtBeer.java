package pl.beertrade.model.beer;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.jto.BartenderOrderProductJTO;
import pl.beertrade.model.beer.jto.OrderedProductListItemJTO;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Entity
@Builder
@Table(name = "BOUGHT_BEER")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@ToString
public class BoughtBeer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "BEER_ID", referencedColumnName = "ID")
    private Beer beer;

    @NotNull
    @OneToOne
    private Client client;

    @NotNull
    private float price;

    @NotNull
    private Date boughtTime;

    public OrderedProductListItemJTO toOrderedProductListItemJTO() {
        return OrderedProductListItemJTO.builder()
                .name(beer.getName())
                .type(beer.getType())
                .brand(beer.getBrand())
                .price(price)
                .id(id)
                .build();
    }

    public BartenderOrderProductJTO toBartenderOrderProductJTO() {
        return BartenderOrderProductJTO.builder()
                .id(beer.getId())
                .name(beer.getName())
                .brand(beer.getBrand())
                .type(beer.getType())
                .userLogin(client.getLogin())
                .tableNumber(client.getTableNumber())
                .build();
    }

    public UUID getId() {
        return id;
    }

}
