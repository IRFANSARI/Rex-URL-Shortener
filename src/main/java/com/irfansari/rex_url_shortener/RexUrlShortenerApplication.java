package com.irfansari.rex_url_shortener;

import com.irfansari.rex_url_shortener.Security.JwtUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RexUrlShortenerApplication {
	public static void main(String[] args) {
		SpringApplication.run(RexUrlShortenerApplication.class, args);
	}
}
