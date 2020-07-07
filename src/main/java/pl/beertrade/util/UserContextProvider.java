package pl.beertrade.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import pl.beertrade.exception.UserNotClientException;
import pl.beertrade.model.user.Client;
import pl.beertrade.model.user.User;
import pl.beertrade.services.UserService;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserContextProvider {

    @Autowired
    private UserService userService;

    public User getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userService.getUserByUsername(userDetails.getUsername());
    }

    public Client getUserAsClient() throws UserNotClientException {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        final Client client = userService.getClientByUsername(userDetails.getUsername());
        if (client == null) {
            throw new UserNotClientException();
        }
        return client;
    }

    public List<GrantedAuthority> getUserRoles() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return new ArrayList<>(userDetails.getAuthorities());
    }

}
