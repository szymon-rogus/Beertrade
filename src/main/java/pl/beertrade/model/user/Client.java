package pl.beertrade.model.user;

import lombok.Builder;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Builder
@DiscriminatorValue("CLIENT")
public class Client extends User {

    @Nullable
    @Column(name = "TABLE_NUMBER")
    private Integer tableNumber;

    //TODO in #10
    //@OneToMany
    //private List<BoughtBeer> boughtBeerList;

}
