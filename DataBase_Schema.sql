CREATE DATABASE IF NOT EXISTS `rex` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
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
