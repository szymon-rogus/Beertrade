package pl.beertrade.model.beer;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.jto.ManageProductsListItemJTO;
import pl.beertrade.model.beer.jto.ProductDetailsJTO;
import pl.beertrade.model.beer.jto.ProductListItemJTO;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    private String type;

    @NotNull
    private Double alcoholPercentage;

    @NotNull
    private Integer ibu;

    @NotNull
    private Double blg;

    @NotNull
    private Integer ebc;

    @NotNull
    private String origin;

    @NotNull
    private String brewery;

    @NotNull
    private String year;

    private String description;

    @NotNull
    @Setter
    private boolean onStore;

    @NotNull
    @Lob
    private byte[] photo;

    @NotNull
    private Double basePrice;

    @NotNull
    private Double minPrice;

    @NotNull
    private Double maxPrice;

    @NotNull
    private Double amortizationFactor;

    public ProductListItemJTO toProductListItemJTO() {
        return ProductListItemJTO.builder()
                .name(name)
                .type(type)
                .id(id)
                .price(mockPrice())
                .build();
    }

    private double mockPrice() {
        Random r = new Random();
        double randomValue = 10.0 * r.nextDouble();
        return Math.round(randomValue*100.0)/100.0;
    }

    public ProductDetailsJTO toProductDetailsJTO() {
        return ProductDetailsJTO.builder()
                .name(name)
                .type(type)
                .description(description)
                .onStore(onStore)
                .build();
    }

    public ManageProductsListItemJTO toManageProductsListItemJTO() {
        return ManageProductsListItemJTO.builder()
                .id(id)
                .name(name)
                .type(type)
                .alcoholPercentage(alcoholPercentage)
                .ibu(ibu)
                .encodedPhoto(Base64.encode(photo))
                .build();
    }

}
