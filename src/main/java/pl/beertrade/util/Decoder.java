package pl.beertrade.util;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64; // TODO java api instead of sun?
import lombok.experimental.UtilityClass;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;

import java.util.ArrayList;

@UtilityClass
public class Decoder {

    private final BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public Client decodeClient(User user) {
        return Client.builder()
                .login(decode(user.getLogin()))
                .password(bCrypt.encode(decode(user.getPassword())))
                .firstName(decode(user.getFirstName()))
                .lastName(decode(user.getLastName()))
                .email(decode(user.getEmail()))
                .phoneNumber(decode(user.getPhoneNumber()))
                .actualOrdersList(new ArrayList<>())
                .historicalOrders(new ArrayList<>())
                .build();
    }

    public String encodeBcrypt(String value) {
        return bCrypt.encode(value);
    }

    private String decode(String encodedString) {
        return new String(Base64.decode(encodedString));
    }

}
