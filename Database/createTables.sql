CREATE TABLE onlinelibrary.user_profile (
  `uid` int NOT NULL AUTO_INCREMENT,
  `ufname` varchar(255) NOT NULL,
  `ulname` varchar(255) NOT NULL,
  `uemail` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.user_credencials (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `uid` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uid`) REFERENCES user_profile (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.validators (
  `vid` int NOT NULL AUTO_INCREMENT,
  `vdate` varchar(255) NOT NULL,
  `vscore` int NOT NULL,
  `vfaults` int NOT NULL,
  `vuid` int NOT NULL,
  PRIMARY KEY (`vid`),
  FOREIGN KEY (`vuid`) REFERENCES user_profile (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.donators (
  `did` int NOT NULL AUTO_INCREMENT,
  `ddate` varchar(255) NOT NULL,
  `dscore` int NOT NULL,
  `dfaults` int NOT NULL,
  `duid` int NOT NULL,
  PRIMARY KEY (`did`),
  FOREIGN KEY (`duid`) REFERENCES user_profile (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.documents (
  `doid` int NOT NULL AUTO_INCREMENT,
  `dolink` varchar(255) NOT NULL,
  `dotype` varchar(255) NOT NULL,
  `dolikes` int NOT NULL,
  `dodislikes` int NOT NULL,
  `doreport` int NOT NULL,
  `dostatus` varchar(255) NOT NULL,
  `dovalid` varchar(255) NOT NULL,
  `dodid` int NOT NULL,
  PRIMARY KEY (`doid`),
  FOREIGN KEY (`dodid`) REFERENCES donators (`did`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.validdocs (
  `vdid` int NOT NULL AUTO_INCREMENT,
  `vdvid` int NOT NULL,
  `vdoid` int NOT NULL,
  PRIMARY KEY (`vdid`),
  FOREIGN KEY (`vdvid`) REFERENCES validators (`vid`),
  FOREIGN KEY (`vdoid`) REFERENCES documents (`doid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.tags (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` varchar(255) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE onlinelibrary.tagref (
  `tgid` int NOT NULL AUTO_INCREMENT,
  `tgdoid` int NOT NULL,
  `tgtid` int NOT NULL,
  PRIMARY KEY (`tgid`),
  FOREIGN KEY (`tgdoid`) REFERENCES documents (`doid`),
  FOREIGN KEY (`tgtid`) REFERENCES tags (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


