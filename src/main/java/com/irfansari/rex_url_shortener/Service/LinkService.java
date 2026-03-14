package com.irfansari.rex_url_shortener.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface LinkService {
    ResponseEntity<?> getAllLinks();
    ResponseEntity<?> getLinkByID(long linkID);
    ResponseEntity<?> addLink(String longURL);
    ResponseEntity<?> deleteLinkByID(long linkID);
}
