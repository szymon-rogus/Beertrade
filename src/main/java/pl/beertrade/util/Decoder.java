package pl.beertrade.util;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import lombok.experimental.UtilityClass;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;

import java.util.ArrayList;
import java.util.Arrays;

@UtilityClass
public class Decoder {

    public Client decodeClient(User user) {
        return Client.builder()
                .login(user.getLogin())
                .password(user.getPassword())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .boughtBeerList(new ArrayList<>())
                .build();
    }

    private String decode(String encodedString) {
        return Arrays.toString(Base64.decode(encodedString));
    }

}
