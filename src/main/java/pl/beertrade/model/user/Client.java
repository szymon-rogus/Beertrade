package pl.beertrade.model.user;

import lombok.*;
import org.springframework.lang.Nullable;
import pl.beertrade.model.order.Order;

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
    private Integer tableNumber;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orderList;

    @Builder
    public Client(@NotNull String login, @NotNull String password,
                  @NotNull String firstName, @NotNull String lastName, @NotNull String email,
                  @NotNull String phoneNumber, @Nullable Integer tableNumber, List<Order> orderList) {
        this.setLogin(login);
        this.setPassword(password);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
        this.tableNumber = tableNumber;
        this.orderList = orderList;
    }
}
