package pl.beertrade.model.user;

import lombok.*;
import org.springframework.lang.Nullable;
import pl.beertrade.model.beer.BoughtBeer;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@DiscriminatorValue("CLIENT")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode(callSuper = true)
public class Client extends User {

    @Nullable
    private Integer tableNumber;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoughtBeer> boughtBeerList;

}
