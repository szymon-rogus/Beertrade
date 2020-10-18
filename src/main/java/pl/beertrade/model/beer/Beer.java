package pl.beertrade.model.beer;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.text.DecimalFormat;
import java.util.Random;
import java.util.UUID;

@Entity
@Builder
@Table(name = "BEER")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@ToString
@Getter
public class Beer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    private String name;

    @NotNull
    private String type; //TODO possible some enum

    @NotNull
    private String brand; //TODO possible some enum

    private String description;

    @NotNull
    private boolean onStore;

    @NotNull
    private boolean onSystem;

    public ProductListItemJTO toProductListItemJTO() {
        return ProductListItemJTO.builder()
                .name(name)
                .type(type)
                .brand(brand)
                .id(id)
                .price(mockPrice())
                .build();
    }

    private double mockPrice() {
        Random r = new Random();
        DecimalFormat df = new DecimalFormat("##.##");
        return Double.parseDouble(df.format(r.nextDouble() * 10.0));
    }

    public ProductDetailsJTO toProductDetailsJTO() {
        return ProductDetailsJTO.builder()
                .name(name)
                .type(type)
                .brand(brand)
                .description(description)
                .onStore(onStore)
                .build();
    }

}
