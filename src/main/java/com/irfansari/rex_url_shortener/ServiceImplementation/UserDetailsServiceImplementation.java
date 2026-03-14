package com.irfansari.rex_url_shortener.ServiceImplementation;

import com.irfansari.rex_url_shortener.Entity.UserEntity;
import com.irfansari.rex_url_shortener.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(username);

        if(optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("UserEntity not found with username: " + username);
        }

        UserEntity user = optionalUser.get();

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }
}
