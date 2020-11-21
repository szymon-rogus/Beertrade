package pl.beertrade.model.table;

import lombok.*;
import pl.beertrade.exception.TableException;
import pl.beertrade.model.table.jto.TableClientViewJTO;
import pl.beertrade.model.user.Client;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@Getter
@javax.persistence.Table(name = "APP_TABLE")
public class Table {

    @Id
    @Column(updatable = false)
    private int tableNumber;

    @NotNull
    private int seats;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "table")
    private List<Client> actualClients;

    public void addClientToTable(Client client) throws TableException {
        if (actualClients.size() == seats) {
            throw new TableException(String.format("Table %d is full.", tableNumber));
        }
        if (actualClients.contains(client)) {
            throw new TableException(String.format("Client %s is already registered in the table %d", client.getLogin(), tableNumber));
        }
        actualClients.add(client);
    }

    public TableClientViewJTO toTableClientViewJTO() {
        final int occupiedSeats = actualClients.size();
        return TableClientViewJTO.builder()
                .tableNumber(getTableNumber())
                .seats(getSeats())
                .occupiedSeats(occupiedSeats)
                .build();
    }
}
