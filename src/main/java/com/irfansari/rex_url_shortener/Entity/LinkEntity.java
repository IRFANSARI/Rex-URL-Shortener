package com.irfansari.rex_url_shortener.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "links", uniqueConstraints = @UniqueConstraint(columnNames = "shortURL"))
public class LinkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 4096, nullable = false)
    private String longURL;

    @Column(length = 16, nullable = false, unique = true)
    private String shortURL;

    @Column(nullable = false)
    private Long ownerID;

    private Long visits = 0L;
}
