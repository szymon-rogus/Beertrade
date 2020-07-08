package pl.beertrade.model.beer;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    private User user;

    @NotNull
    private float price;

    @NotNull
    private long boughtTime;

    public OrderedProductListItemJTO toOrderedProductListItemJTO() {
        return OrderedProductListItemJTO.builder()
                .name(beer.getName())
                .type(beer.getType())
                .brand(beer.getBrand())
                .price(price)
                .id(id)
                .build();
    }

    public UUID getId(){
        return id;
    }
}
