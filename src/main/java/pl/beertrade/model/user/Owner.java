package pl.beertrade.model.user;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Builder
@DiscriminatorValue("OWNER")
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class Owner extends User {
}
