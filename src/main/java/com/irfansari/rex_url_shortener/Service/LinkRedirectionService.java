package com.irfansari.rex_url_shortener.Service;

import org.springframework.stereotype.Service;

@Service
public interface LinkRedirectionService {
    String getLongURL(String shortURL);
}
