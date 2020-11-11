package pl.beertrade.model.user;

import lombok.*;
import org.springframework.lang.Nullable;
import pl.beertrade.model.order.Order;
import pl.beertrade.model.statistics.HistoricalOrder;
import pl.beertrade.model.table.Table;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@DiscriminatorValue("CLIENT")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class Client extends User {

    @Nullable
    @ManyToOne
    private Table table;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "client")
    private List<Order> actualOrdersList;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "client")
    private List<HistoricalOrder> historicalOrdersList;

    @Builder
    public Client(@NotNull String login, @NotNull String password,
                  @NotNull String firstName, @NotNull String lastName, @NotNull String email,
                  @NotNull String phoneNumber, List<Order> actualOrdersList) {
        this.setLogin(login);
        this.setPassword(password);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
        this.actualOrdersList = actualOrdersList;
    }
}
