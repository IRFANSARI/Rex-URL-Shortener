CREATE DATABASE IF NOT EXISTS `rex`;
USE `rex`;

CREATE TABLE `urls` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `short_url` varchar(256) NOT NULL,
  `long_url` varchar(4096) NOT NULL,
  `username` varchar(20) NOT NULL
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL
);
