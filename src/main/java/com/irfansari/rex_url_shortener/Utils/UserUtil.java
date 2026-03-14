package com.irfansari.rex_url_shortener.Utils;

import com.irfansari.rex_url_shortener.Entity.UserEntity;
import com.irfansari.rex_url_shortener.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    @Autowired
    UserRepository userRepository;

    public UserEntity getCurrentUser() {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername()).orElse(null);
    }
}
