package com.irfansari.rex_url_shortener.Repository;

import com.irfansari.rex_url_shortener.Entity.LinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface LinkRepository extends JpaRepository<LinkEntity, Long> {
    ArrayList<LinkEntity> findByOwnerID(long ownerID);
    Optional<LinkEntity> findByShortURL(String shortURL);
    Optional<LinkEntity> findByLongURLAndOwnerID(String longURL, Long ownerID);
}