package pl.beertrade.util;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import lombok.experimental.UtilityClass;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;

import java.util.ArrayList;

@UtilityClass
public class Decoder {

    public Client decodeClient(User user) {
        return Client.builder()
                .login(decode(user.getLogin()))
                .password(decode(user.getPassword()))
                .firstName(decode(user.getFirstName()))
                .lastName(decode(user.getLastName()))
                .email(decode(user.getEmail()))
                .phoneNumber(decode(user.getPhoneNumber()))
                .boughtBeerList(new ArrayList<>())
                .build();
    }

    private String decode(String encodedString) {
        return new String(Base64.decode(encodedString));
    }

}
