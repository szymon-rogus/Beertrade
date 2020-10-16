package pl.beertrade.model.table;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.exception.ClientAlreadyInTableException;
import pl.beertrade.exception.ClientNotInTableException;
import pl.beertrade.exception.TableException;
import pl.beertrade.exception.TableFullException;
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
@Getter
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

    public void addClientToTable(Client client) throws TableException {
        if (actualClients.size() == seats) {
            throw new TableFullException(String.format("Table %s is full.", name));
        }
        if (actualClients.contains(client)) {
            throw new ClientAlreadyInTableException(String.format("Client %s is already registered in the table %s", client.getLogin(), name));
        }
        actualClients.add(client);
    }

    public void removeClientFromTable(Client client) throws ClientNotInTableException {
        if (actualClients.size() == 0 || !actualClients.contains(client)) {
            throw new ClientNotInTableException(String.format("Client %s is not registered in the table %s", client.getLogin(), name));
        }
        actualClients.remove(client);
    }

}
