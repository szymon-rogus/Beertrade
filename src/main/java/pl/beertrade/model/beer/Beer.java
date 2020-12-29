package pl.beertrade.model.beer;

import lombok.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.enums.ProductState;
import pl.beertrade.model.beer.jto.*;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.user.Client;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Date;
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
    @Setter
    private Double basePrice;

    @NotNull
    @Setter
    private Double minPrice;

    @NotNull
    @Setter
    private Double maxPrice;

    private Double amortizationFactor;

    public ProductListItemJTO toProductListItemJTO() {
        return ProductListItemJTO.builder()
                .name(name)
                .type(type)
                .id(id)
                .ibu(ibu)
                .alcoholPercentage(alcoholPercentage)
                .basePrice(basePrice)
                .encodedPhoto(Base64.encodeBase64String(photo))
                .build();
    }

    public ProductDetailsJTO toProductDetailsJTO() {
        return ProductDetailsJTO.builder()
                .name(name)
                .type(type)
                .alcoholPercentage(alcoholPercentage)
                .ibu(ibu)
                .blg(blg)
                .ebc(ebc)
                .brewery(brewery)
                .year(year)
                .origin(origin)
                .description(description)
                .encodedPhoto(Base64.encodeBase64String(photo))
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

    public FullProductJTO toFullProductJTO(){
        return FullProductJTO.builder()
                .id(id)
                .name(name)
                .type(type)
                .alcoholPercentage(alcoholPercentage)
                .encodedPhoto(Base64.encodeBase64String(photo))
                .productState(productState)
                .basePrice(basePrice)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .amortizationFactor(amortizationFactor)
                .ibu(ibu)
                .blg(blg)
                .ebc(ebc)
                .origin(origin)
                .brewery(brewery)
                .year(year)
                .description(description)
                .build();
    }

    public ConfigureProductsListItemJTO toConfigureProductsListItemJTO() {
        return ConfigureProductsListItemJTO.builder()
                .id(id)
                .name(name)
                .basePrice(basePrice)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .amortizationFactor(amortizationFactor)
                .build();
    }

    public Order saveAsOrder(Client client, Float price, Integer amount, int counter) {
        return Order.builder()
                .client(client)
                .product(this)
                .price(price*amount)
                .boughtDate(Date.from(Instant.now()))
                .orderViewId(counter)
                .orderState(OrderState.WAITING)
                .amount(amount)
                .build();
    }
}
