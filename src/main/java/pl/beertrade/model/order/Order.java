package pl.beertrade.model.order;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.order.jto.BartenderOrderProductJTO;
import pl.beertrade.model.beer.jto.OrderedProductListItemJTO;
import pl.beertrade.model.user.Client;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.UUID;

@Entity
@Builder
@Table(name = "APP_ORDER")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@ToString
public class Order {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    private Integer orderViewId;

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

    @NotNull
    @ManyToOne
    private Client client;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Setter
    @Getter
    private OrderState orderState;

    public OrderedProductListItemJTO toOrderedProductListItemJTO() {
        return OrderedProductListItemJTO.builder()
                .name(product.getName())
                .type(product.getType())
                .price(price)
                .id(id)
                .build();
    }

    public BartenderOrderProductJTO toBartenderOrderProductJTO() {
        return BartenderOrderProductJTO.builder()
                .id(id)
                .orderViewId(orderViewId)
                .timeOrdered(LocalDateTime.ofInstant(boughtDate.toInstant(), ZoneId.systemDefault())
                        .toLocalTime()
                        .format(DateTimeFormatter.ofPattern("HH:mm")))
                .beerName(product.getName())
                .amount(amount)
                .tableNumber(client.getTable().getTableNumber())
                .userLogin(client.getLogin())
                .build();
    }

    public UUID getId() {
        return id;
    }

}
