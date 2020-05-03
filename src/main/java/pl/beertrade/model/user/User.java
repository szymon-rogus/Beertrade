package pl.beertrade.model.user;

import lombok.NonNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "APP_USER")
@DiscriminatorColumn(name = "USER_TYPE", discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "ID", updatable = false)
    private UUID id;

    @NonNull
    @Column(name = "LOGIN", unique = true)
    private String login;

    @NonNull
    @Column(name = "PASSWORD")
    private String password;


    @NonNull
    @Column(name = "FIRST_NAME")
    private String firstName;

    @NonNull
    @Column(name = "SURNAME")
    private String surname;

    @NonNull
    @Column(name = "EMAIL")
    private String email;

    @NonNull
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

}
