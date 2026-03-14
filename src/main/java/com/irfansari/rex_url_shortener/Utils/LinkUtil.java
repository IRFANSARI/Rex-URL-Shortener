package com.irfansari.rex_url_shortener.Utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class LinkUtil {
        private static final String BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static String generateShortURL(String username) {
            try {
                int length = 6;
                String input = username + System.currentTimeMillis();

                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));

                StringBuilder shortUrl = new StringBuilder();
                for (int i = 0; i < hashBytes.length && shortUrl.length() < length; i++) {
                    int index = (hashBytes[i] & 0xFF) % BASE62.length();
                    shortUrl.append(BASE62.charAt(index));
                }

                return shortUrl.toString();

            } catch (Exception e) {
                throw new RuntimeException("Failed to generate short URL", e);
            }
        }
}
