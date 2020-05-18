package pl.beertrade.model.table;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.beer.Beer;
import pl.beertrade.model.user.Client;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@javax.persistence.Table(name = "APP_TABLE")
public class Table {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    private int tableNumber;

    @NotNull
    private String name;

    @NotNull
    private int seats;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Client> actualClients;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Beer> orderList;
}
