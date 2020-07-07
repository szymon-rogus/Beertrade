package pl.beertrade.model.beer;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

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
    private float price;

    public ProductListItemJTO toProductListItemJTO() {
        return ProductListItemJTO.builder()
                .name(beer.getName())
                .type(beer.getType())
                .brand(beer.getBrand())
                .price(price)
                .build();
    }

    public ProductDetailsJTO toProductDetailsJTO() {
        return ProductDetailsJTO.builder()
                .name(beer.getName())
                .type(beer.getType())
                .alcoholPercentage(beer.getAlcoholPercentage())
                .brand(beer.getBrand())
                .color(beer.getColor())
                .description(beer.getDescription())
                .onStore(beer.isOnStore())
                .price(price)
                .build();
    }

}
