package pl.beertrade.model.user;

import lombok.Builder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Builder
@DiscriminatorValue("WAITER")
public class Waiter extends User {
}
