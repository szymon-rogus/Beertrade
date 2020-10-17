package pl.beertrade.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.beertrade.model.user.User;
import pl.beertrade.repositories.UserRepository;

import java.util.Optional;

@Service
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        log.trace("ENTRY - loadUserByUsername - {}", login);
        final Optional<User> user = userRepository.findByLogin(login);
        final JwtUserDetails userDetails = user.map(User::toJwtUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User not found: '%s'.", login)));
        log.trace("EXIT - loadUserByUsername - {}", userDetails);
        return userDetails;
    }

}
