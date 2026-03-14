package com.irfansari.rex_url_shortener.ServiceImplementation;

import com.irfansari.rex_url_shortener.Entity.LinkEntity;
import com.irfansari.rex_url_shortener.Repository.LinkRepository;
import com.irfansari.rex_url_shortener.Service.LinkRedirectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LinkRedirectionServiceImplementation implements LinkRedirectionService {

    @Autowired
    LinkRepository linkRepository;

    @Override
    public String getLongURL(String shortURL) {
        Optional<LinkEntity> optional = linkRepository.findByShortURL(shortURL);

        if(optional.isEmpty()) {
            return "https://google.com";
        }

        LinkEntity link = optional.get();
        link.setVisits(link.getVisits() + 1);
        linkRepository.save(link);

        return link.getLongURL();
    }
}
