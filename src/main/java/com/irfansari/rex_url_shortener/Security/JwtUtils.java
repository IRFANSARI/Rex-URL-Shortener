package com.irfansari.rex_url_shortener.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${JWT_SECRET}")
    private String SECRET_KEY;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }

    public String generateToken(String username) {
        Date expiryDate = new Date(System.currentTimeMillis() + (1000L * 60 * 60 * 10000));

        return Jwts
                .builder()
                .signWith(getSigningKey())
                .subject(username)
                .issuedAt(new Date())
                .expiration(expiryDate)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token, String expectedUsername) {
        String username = extractUsername(token);
        return username.equals(expectedUsername);
    }
}
