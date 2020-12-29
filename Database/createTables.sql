CREATE TABLE onlinelibrary.user_profile (
  `Uid` int NOT NULL AUTO_INCREMENT,
  `Ufname` varchar(255) NOT NULL,
  `Ulname` varchar(255) NOT NULL,
  `Uemail` varchar(255) NOT NULL,
  PRIMARY KEY (`Uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.user_credencials (
  `UCid` int NOT NULL AUTO_INCREMENT,
  `UCusername` varchar(255) NOT NULL,
  `UCpassword` varchar(255) NOT NULL,
  `UCuid` int NOT NULL,
  PRIMARY KEY (`UCid`),
  FOREIGN KEY (`UCuid`) REFERENCES user_profile (`Uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.validators (
  `Vid` int NOT NULL AUTO_INCREMENT,
  `Vdate` varchar(255) NOT NULL,
  `Vscore` int NOT NULL,
  `Vfaults` int NOT NULL,
  `Vuid` int NOT NULL,
  PRIMARY KEY (`Vid`),
  FOREIGN KEY (`Vuid`) REFERENCES user_profile (`Uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.donators (
  `Did` int NOT NULL AUTO_INCREMENT,
  `Ddate` varchar(255) NOT NULL,
  `Dscore` int NOT NULL,
  `Dfaults` int NOT NULL,
  `Duid` int NOT NULL,
  PRIMARY KEY (`Did`),
  FOREIGN KEY (`Duid`) REFERENCES user_profile (`Uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.documents (
  `DOid` int NOT NULL AUTO_INCREMENT,
  `DOlink` varchar(255) NOT NULL,
  `DOtype` varchar(255) NOT NULL,
  `DOreport` int NOT NULL,
  `DOstatus` varchar(255) NOT NULL,
  `DOvalid` varchar(255) NOT NULL,
  `DOviews` int NOT NULL,
  `DOdid` int NOT NULL,
  PRIMARY KEY (`DOid`),
  FOREIGN KEY (`DOdid`) REFERENCES donators (`Did`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.validdocs (
  `VDid` int NOT NULL AUTO_INCREMENT,
  `VDvid` int NOT NULL,
  `VDoid` int NOT NULL,
  PRIMARY KEY (`VDid`),
  FOREIGN KEY (`VDvid`) REFERENCES validators (`Vid`),
  FOREIGN KEY (`VDoid`) REFERENCES documents (`DOid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.tags (
  `Tid` int NOT NULL AUTO_INCREMENT,
  `Tname` varchar(255) NOT NULL,
  PRIMARY KEY (`Tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.tagref (
  `TGid` int NOT NULL AUTO_INCREMENT,
  `TGdoid` int NOT NULL,
  `TGtid` int NOT NULL,
  PRIMARY KEY (`TGid`),
  FOREIGN KEY (`TGdoid`) REFERENCES documents (`DOid`),
  FOREIGN KEY (`TGtid`) REFERENCES tags (`Tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.reportdocs (
  `RDid` int NOT NULL AUTO_INCREMENT,
  `RDuid` int NOT NULL,
  `RDdoid` int NOT NULL,
  PRIMARY KEY (`RDid`),
  FOREIGN KEY (`RDuid`) REFERENCES user_profile (`Uid`),
  FOREIGN KEY (`RDdoid`) REFERENCES documents (`DOid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


