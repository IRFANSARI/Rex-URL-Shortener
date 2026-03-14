package com.irfansari.rex_url_shortener.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.irfansari.rex_url_shortener.DTO.LinkDTO;
import com.irfansari.rex_url_shortener.Service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
public class LinkController {

    @Autowired
    LinkService linkService;

    @GetMapping("/links")
    public ResponseEntity<?> getAllLinks() {
        return linkService.getAllLinks();
    }

    @GetMapping("/links/{linkID}")
    public ResponseEntity<?> getLinkByID(@PathVariable("linkID") long linkID) {
        return linkService.getLinkByID(linkID);
    }

    @PostMapping("/link")
    public ResponseEntity<?> addLink(@RequestBody LinkDTO linkDTO) {
        return linkService.addLink(linkDTO.getLongURL());
    }

    @DeleteMapping("/link/{linkID}")
    public ResponseEntity<?> deleteLink(@PathVariable("linkID") long linkID) {
        return linkService.deleteLinkByID(linkID);
    }
}
