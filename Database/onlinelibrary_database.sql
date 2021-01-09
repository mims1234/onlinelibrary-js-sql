-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2021 at 01:09 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinelibrary`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `DOid` int(11) NOT NULL,
  `DOlink` varchar(255) NOT NULL,
  `DOtype` varchar(255) NOT NULL,
  `DOreport` int(11) NOT NULL,
  `DOstatus` varchar(255) NOT NULL,
  `DOviews` int(11) NOT NULL,
  `DOuid` int(11) NOT NULL,
  `DOtitle` varchar(255) NOT NULL,
  `DOdesc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tagref`
--

CREATE TABLE `tagref` (
  `TGid` int(11) NOT NULL,
  `TGdid` int(11) NOT NULL,
  `TGtid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `Tid` int(11) NOT NULL,
  `Tname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_credencials`
--

CREATE TABLE `user_credencials` (
  `UCid` int(11) NOT NULL,
  `UCusername` varchar(255) NOT NULL,
  `UCpassword` varchar(255) NOT NULL,
  `UCuid` int(11) NOT NULL,
  `UCrole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `Uid` int(11) NOT NULL,
  `Ufname` varchar(255) NOT NULL,
  `Ulname` varchar(255) NOT NULL,
  `Uemail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`DOid`),
  ADD KEY `DOuid` (`DOuid`);

--
-- Indexes for table `tagref`
--
ALTER TABLE `tagref`
  ADD PRIMARY KEY (`TGid`),
  ADD KEY `TGdid` (`TGdid`),
  ADD KEY `TGtid` (`TGtid`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`Tid`);

--
-- Indexes for table `user_credencials`
--
ALTER TABLE `user_credencials`
  ADD PRIMARY KEY (`UCid`),
  ADD KEY `UCuid` (`UCuid`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`Uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `DOid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tagref`
--
ALTER TABLE `tagref`
  MODIFY `TGid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `Tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user_credencials`
--
ALTER TABLE `user_credencials`
  MODIFY `UCid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `Uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`DOuid`) REFERENCES `user_profile` (`Uid`);

--
-- Constraints for table `tagref`
--
ALTER TABLE `tagref`
  ADD CONSTRAINT `tagref_ibfk_1` FOREIGN KEY (`TGdid`) REFERENCES `documents` (`DOid`),
  ADD CONSTRAINT `tagref_ibfk_2` FOREIGN KEY (`TGtid`) REFERENCES `tags` (`Tid`);

--
-- Constraints for table `user_credencials`
--
ALTER TABLE `user_credencials`
  ADD CONSTRAINT `user_credencials_ibfk_1` FOREIGN KEY (`UCuid`) REFERENCES `user_profile` (`Uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
