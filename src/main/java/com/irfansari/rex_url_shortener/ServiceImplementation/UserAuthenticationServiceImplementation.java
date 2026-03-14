package com.irfansari.rex_url_shortener.ServiceImplementation;

import com.irfansari.rex_url_shortener.Entity.UserEntity;
import com.irfansari.rex_url_shortener.Repository.UserRepository;
import com.irfansari.rex_url_shortener.Security.JwtUtils;
import com.irfansari.rex_url_shortener.Service.UserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserAuthenticationServiceImplementation implements UserAuthenticationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public ResponseEntity<?> login(String username, String password) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        String token = jwtUtils.generateToken(username);
        return new ResponseEntity<>(Map.of("JWT_TOKEN", token), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return new ResponseEntity<>(Map.of("error","Username already exists"), HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);
        return new ResponseEntity<>(Map.of("message","UserEntity registered successfully"), HttpStatus.CREATED);
    }
}
