package com.irfansari.rex_url_shortener.ServiceImplementation;

import com.irfansari.rex_url_shortener.Entity.LinkEntity;
import com.irfansari.rex_url_shortener.Entity.UserEntity;
import com.irfansari.rex_url_shortener.Repository.LinkRepository;
import com.irfansari.rex_url_shortener.Service.LinkService;
import com.irfansari.rex_url_shortener.Utils.LinkUtil;
import com.irfansari.rex_url_shortener.Utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class LinkServiceImplementation implements LinkService {

    @Autowired
    LinkRepository linkRepository;

    @Autowired
    UserUtil userUtil;

    @Override
    public ResponseEntity<?> getAllLinks() {
        UserEntity currentUser = userUtil.getCurrentUser();
        return new ResponseEntity<>(linkRepository.findByOwnerID(currentUser.getId()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getLinkByID(long linkID) {
        UserEntity currentUser = userUtil.getCurrentUser();
        Optional<LinkEntity> optionalLink = linkRepository.findById(linkID);

        if(optionalLink.isEmpty()) {
            return new ResponseEntity<>(Map.of("error", "LinkEntity doesn't exist"), HttpStatus.NOT_FOUND);
        }

        LinkEntity link = optionalLink.get();
        if(!Objects.equals(link.getOwnerID(), currentUser.getId())) {
            return new ResponseEntity<>(Map.of("error", "LinkEntity doesn't exist"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(link, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> addLink(String longURL) {
        UserEntity currentUser = userUtil.getCurrentUser();
        String username = currentUser.getUsername();
        Long ownerID = currentUser.getId();

        Optional<LinkEntity> optionalLink = linkRepository.findByLongURLAndOwnerID(longURL, ownerID);

        if(optionalLink.isPresent()) {
            return new ResponseEntity<>(Map.of("message", "Added a link", "link", optionalLink.get()), HttpStatus.CREATED);
        }

        String shortURL = LinkUtil.generateShortURL(username);
        LinkEntity link = LinkEntity
                .builder()
                .shortURL(shortURL)
                .longURL(longURL)
                .ownerID(ownerID)
                .visits(0L)
                .build();

        linkRepository.save(link);
        return new ResponseEntity<>(Map.of("message", "Added a link", "link", link), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> deleteLinkByID(long linkID) {
        UserEntity currentUser = userUtil.getCurrentUser();
        Long currentUserID = currentUser.getId();
        Optional<LinkEntity> optionalLink = linkRepository.findById(linkID);

        if(optionalLink.isEmpty()) {
            return new ResponseEntity<>(Map.of("error","LinkEntity not found"), HttpStatus.NOT_FOUND);
        }

        LinkEntity link = optionalLink.get();

        if(!Objects.equals(link.getOwnerID(), currentUserID)) {
            return new ResponseEntity<>(Map.of("error","You are not authorized to delete this link"), HttpStatus.FORBIDDEN);
        }

        linkRepository.deleteById(linkID);
        return new ResponseEntity<>(Map.of("message","Deleted Successfully"), HttpStatus.OK);
    }
}
