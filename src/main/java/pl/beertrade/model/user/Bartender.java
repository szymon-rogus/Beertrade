package pl.beertrade.model.user;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Builder
@DiscriminatorValue("BARTENDER")
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class Bartender extends User {
}
