package pl.beertrade.model.order;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.order.enums.OrderState;
import pl.beertrade.model.order.jto.Bartender.BartenderOrderProductJTO;
import pl.beertrade.model.beer.jto.OrderedProductListItemJTO;
import pl.beertrade.model.order.jto.Client.ClientOrderProductJTO;
import pl.beertrade.model.statistics.HistoricalOrder;
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
    @Getter
    private UUID id;

    @NotNull
    private Integer orderViewId;

    @NotNull
    @Getter
    private Date boughtDate;

    @NotNull
    @OneToOne
    @JoinColumn(name = "PRODUCT_ID", referencedColumnName = "ID")
    @Getter
    private Beer product;

    @NotNull
    @Getter
    private float price;

    @NotNull
    @Getter
    private Integer amount;

    @NotNull
    @ManyToOne
    @Getter
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

    public ClientOrderProductJTO toClientOrderProductJTO() {
        return ClientOrderProductJTO.builder()
                .id(id)
                .orderViewId(orderViewId)
                .timeOrdered(LocalDateTime.ofInstant(boughtDate.toInstant(), ZoneId.systemDefault())
                        .toLocalTime()
                        .format(DateTimeFormatter.ofPattern("HH:mm")))
                .beerName(product.getName())
                .amount(amount)
                .orderState(orderState)
                .totalPrice(price)
                .build();
    }

    public HistoricalOrder toHistoricalOrderJTO(Order order) {
        return HistoricalOrder.builder()
                .id(UUID.randomUUID())
                .amount(order.getAmount())
                .basePrice(order.getProduct()
                        .getBasePrice())
                .boughtDate(order.getBoughtDate())
                .client(order.getClient())
                .price(order.getPrice())
                .product(order.getProduct())
                .build();
    }
}
