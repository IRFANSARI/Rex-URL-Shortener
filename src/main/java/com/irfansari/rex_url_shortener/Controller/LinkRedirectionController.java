package com.irfansari.rex_url_shortener.Controller;

import com.irfansari.rex_url_shortener.Service.LinkRedirectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LinkRedirectionController {

    @Autowired
    LinkRedirectionService linkRedirectionService;

    @GetMapping("l/{shortURL}")
    public ModelAndView RedirectURL(@PathVariable("shortURL") String shortURL) {
        String longURL = linkRedirectionService.getLongURL(shortURL);
        return new ModelAndView("redirect:" + longURL);
    }
}
