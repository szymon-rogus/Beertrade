package pl.beertrade.model.user;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Builder
@DiscriminatorValue("CLIENT")
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode(callSuper = true)
public class Client extends User {

    @Nullable
    private Integer tableNumber;

    //TODO in #10
    //@OneToMany
    //private List<BoughtBeer> boughtBeerList;

}
