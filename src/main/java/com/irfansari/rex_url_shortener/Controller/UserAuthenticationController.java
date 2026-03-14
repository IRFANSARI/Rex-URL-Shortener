package com.irfansari.rex_url_shortener.Controller;

import org.springframework.http.ResponseEntity;
import com.irfansari.rex_url_shortener.DTO.UserDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.irfansari.rex_url_shortener.Service.UserAuthenticationService;

@RestController
@RequestMapping("/auth")
public class UserAuthenticationController {

    @Autowired
    UserAuthenticationService userAuthenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();

        return userAuthenticationService.login(username, password);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();

        return userAuthenticationService.register(username, password);
    }
}
