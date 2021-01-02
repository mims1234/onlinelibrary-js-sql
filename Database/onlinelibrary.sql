-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2021 at 08:03 PM
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

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`DOid`, `DOlink`, `DOtype`, `DOreport`, `DOstatus`, `DOviews`, `DOuid`, `DOtitle`, `DOdesc`) VALUES
(1, 'https://genxclub.github.io/', 'ARTICLE', 0, 'PUBLIC', 75, 1, 'GenXclub Website', 'Checkout this new coding community site'),
(2, 'https://www.youtube.com/watch?v=mapqovPazRY', 'YOUTUBE', 0, 'PUBLIC', 33, 2, 'Covid-19 Tracker', 'Covid-19 WEB Project Simulation for VTU'),
(3, 'https://scet.berkeley.edu/wp-content/uploads/BlockchainPaper.pdf', 'PDF', 1, 'BLOCKED', 100, 1, 'Blockchain Basics', 'Explains about use and how Blockchain system works'),
(24, 'https://www.google.com/', 'YOUTUBE', 0, 'PUBLIC', 1, 2, 'Google Website', 'Description of www.google.com');

-- --------------------------------------------------------

--
-- Table structure for table `tagref`
--

CREATE TABLE `tagref` (
  `TGid` int(11) NOT NULL,
  `TGdid` int(11) NOT NULL,
  `TGtid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tagref`
--

INSERT INTO `tagref` (`TGid`, `TGdid`, `TGtid`) VALUES
(2, 2, 2),
(47, 3, 1),
(48, 3, 3),
(49, 1, 1),
(50, 1, 24),
(59, 24, 1),
(60, 24, 24);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `Tid` int(11) NOT NULL,
  `Tname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`Tid`, `Tname`) VALUES
(1, 'DOCUMENTS'),
(2, 'WEB PROJECT'),
(3, 'BLOCKCHAIN'),
(24, 'WEBSITES'),
(26, 'COMMUNITY'),
(27, 'TESTING'),
(28, 'SEARCH'),
(29, 'WEBSITE'),
(30, 'SOCIAL MEDIA'),
(31, 'GAMINGAPP');

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

--
-- Dumping data for table `user_credencials`
--

INSERT INTO `user_credencials` (`UCid`, `UCusername`, `UCpassword`, `UCuid`, `UCrole`) VALUES
(1, 'batman', 'batman', 1, 1),
(2, 'reddy', 'reddy', 2, 2),
(3, 'aayush', 'aayush', 3, 2),
(4, 'admin', 'admin', 4, 3),
(15, 'testuser', 'testpass', 24, 1);

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
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`Uid`, `Ufname`, `Ulname`, `Uemail`) VALUES
(1, 'Batman', 'Batman', 'batman@gmail.com'),
(2, 'Reddy', 'Reddy', 'reddy@gmail.com'),
(3, 'Aayush', 'Aayush', 'aayush@gmail.com'),
(4, 'Admin', 'Admin', 'admin@gmail.com'),
(24, 'testfname', 'testlname', 'test@email.com');

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
  MODIFY `DOid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tagref`
--
ALTER TABLE `tagref`
  MODIFY `TGid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `Tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user_credencials`
--
ALTER TABLE `user_credencials`
  MODIFY `UCid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `Uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
