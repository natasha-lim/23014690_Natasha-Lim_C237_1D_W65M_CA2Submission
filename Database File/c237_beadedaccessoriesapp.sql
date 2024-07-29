-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2024 at 05:09 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237_beadedaccessoriesapp`
--
CREATE DATABASE IF NOT EXISTS `c237_beadedaccessoriesapp` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `c237_beadedaccessoriesapp`;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` double(10,2) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `name`, `category`, `description`, `price`, `image`) VALUES
(1, 'Cottage-core inspired bracelet', 'Bracelet', 'Cottage-core inspired bracelets that features special beads such as mushroom beads, leaf beads, butterfly charms and more! All perfectly assembled in a manner that would make you feel like you are part of the cottage-core aesthetic!', 10.00,  'https://i.pinimg.com/564x/f1/fb/18/f1fb182a9998572bd9f02b4c37ce7cdd.jpg'),
(2, 'Night-sky inspired earrings', 'Earring', 'Wanna feel like you are being whisked away into the night sky? These earrings feature the perfect beads and charms such as moon and star charms, blue colour-coded beads and more. This piece of jewellery is sure to make you feel like you are part of the night sky.', 12.00, 'https://i.pinimg.com/564x/fc/58/0d/fc580d9234607975ccd89e5da6fb687f.jpg'),
(3, 'Blue Jellyfish Phone Charm', 'Phone charm', 'This phone charm takes the form of a blue jellyfish. Following a blue aesthetic that contrasts to the blue ocean itself, each bead of different shades of blue have been picked intricately to put together a shiny and pretty jellyfish phone charm', 9.00, 'https://i.pinimg.com/564x/9b/47/ef/9b47ef29590d7c27466f5c25c13b14b7.jpg'),
(4, 'Beaded Frog Keychain', 'Keychain', 'Looking for a cute animal keychain? Well, consider this frog keychain! This simple keychain may have a simple structure but it features a few green-coloured beads that solidifies its design, while finishing off with a cute frog charm at the end.', 7.00, 'https://i.pinimg.com/564x/7f/d8/9c/7fd89c521ae28e494a359f78b89e8ce0.jpg');

-- Table structure for table 'beads'
CREATE TABLE `beadsandaccessories` (
  `accessoryId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` double(10,2) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table 'beads'
INSERT INTO `beadsandaccessories` (`accessoryId`, `name`, `description`, `price`, `image`) VALUES
(1, 'Seed Beads (Purple)', '3mm Purple Seed Beads - 1 pax', 0.80, 'https://i.pinimg.com/564x/80/af/c3/80afc3b9cb9e29323013101b44ac6d61.jpg'),
(2, 'Rainbow Pink Japanese Glass Seed Beads', '1.30mm Japanese Glass Seed Beads (Rainbow Pink version) - 1 pax', 0.90, 'https://i.pinimg.com/564x/16/75/25/167525ee213f5302d8ae15ae35c4fbeb.jpg'),
(3, 'Multi-coloured Glass Beads', '10mm Multi-coloured Glass Beads (Red-and-Green version) - 1 pax', 1.50, 'https://i.pinimg.com/564x/bd/7e/d5/bd7ed53c119a5bfa73e1bd4a5e432447.jpg'),
(4, 'Star Charms Metal Pendant', 'Star Charms Metal Pendant - 1 pax', 1.30, 'https://i.pinimg.com/564x/11/cb/76/11cb76ecb9d27fe86b0794eefe43279b.jpg'),
(5, 'Ribbon Charm Metal Pendant', 'Ribbon Charms Metal Pendant - 1 pax', 1.30, 'https://i.pinimg.com/564x/59/48/e1/5948e1bd05d9d5f18dece269d8bdfd2a.jpg');


-- Table structure for table 'commissions'
CREATE TABLE `commissions` (
  `commissionId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `stringlength` double(10,2) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `selection` varchar(200) NOT NULL,
  `instructions` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table 'contact'
CREATE TABLE `contact` (
  `contactId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
