package pl.beertrade.model.beer;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "BOUGHT_BEER")
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class BoughtBeer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "BEER_ID", referencedColumnName = "ID")
    private Beer beer;

    @NotNull
    private float price;
}
