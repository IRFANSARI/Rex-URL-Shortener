package com.irfansari.rex_url_shortener.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserAuthenticationService {
    ResponseEntity<?> login(String username, String password);
    ResponseEntity<?> register(String username, String password);
}
