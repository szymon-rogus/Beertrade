package pl.beertrade.model.beer;

import lombok.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.enums.ProductState;
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
@AllArgsConstructor(access = AccessLevel.PUBLIC)
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

    private Double blg;

    private Integer ebc;

    private String origin;

    private String brewery;

    private String year;

    @Column(length = 2048)
    private String description;

    @NotNull
    @Setter
    @Enumerated(EnumType.STRING)
    private ProductState productState;

    private byte[] photo;

    @NotNull
    private Double basePrice;

    @NotNull
    private Double minPrice;

    @NotNull
    private Double maxPrice;

    private Double amortizationFactor;

    public ProductListItemJTO toProductListItemJTO() {
        return ProductListItemJTO.builder()
                .name(name)
                .type(type)
                .id(id)
                .ibu(ibu)
                .alcoholPercentage(alcoholPercentage)
                .build();
    }

    public ProductDetailsJTO toProductDetailsJTO() {
        return ProductDetailsJTO.builder()
                .name(name)
                .price(mockPrice())
                .type(type)
                .alcoholPercentage(alcoholPercentage)
                .ibu(ibu)
                .blg(blg)
                .ebc(ebc)
                .brewery(brewery)
                .year(year)
                .origin(origin)
                .description(description)
                .build();
    }

    public ManageProductsListItemJTO toManageProductsListItemJTO() {
        return ManageProductsListItemJTO.builder()
                .id(id)
                .name(name)
                .type(type)
                .alcoholPercentage(alcoholPercentage)
                .encodedPhoto(Base64.encodeBase64String(photo))
                .productState(productState)
                .build();
    }

}
