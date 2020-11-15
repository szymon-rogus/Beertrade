package pl.beertrade.util;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import lombok.experimental.UtilityClass;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;

import java.util.ArrayList;

@UtilityClass
public class Decoder {

    private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    public Client decodeClient(User user) {
        return Client.builder()
                .login(decode(user.getLogin()))
                .password(bcrypt.encode(decode(user.getPassword())))
                .firstName(decode(user.getFirstName()))
                .lastName(decode(user.getLastName()))
                .email(decode(user.getEmail()))
                .phoneNumber(decode(user.getPhoneNumber()))
                .actualOrdersList(new ArrayList<>())
<<<<<<< Updated upstream
=======
                .historicalOrders(new ArrayList<>())
>>>>>>> Stashed changes
                .build();
    }

    public String encodeBcrypt(String value) {
        return bcrypt.encode(value);
    }

    private String decode(String encodedString) {
        return new String(Base64.decode(encodedString));
    }

}
