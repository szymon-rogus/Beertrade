package pl.beertrade.model.beer;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Builder
@Table(name = "BEER")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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
    private String type; //TODO possible some enum

    @NotNull
    private float alcoholPercentage;

    @NotNull
    private String brand; //TODO possible some enum

    private String color;

    private String description;

    @NotNull
    private boolean onStore;

    @NotNull
    private boolean onSystem;

}
