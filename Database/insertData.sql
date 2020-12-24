INSERT INTO onlinelibrary.user_profile(ufname,ulname,uemail) VALUES ("FBatman","Lastname","batman@gmail.com");
INSERT INTO onlinelibrary.user_profile(ufname,ulname,uemail) VALUES ("Reddy","Lastname","reddy@gmail.com");
INSERT INTO onlinelibrary.user_profile(ufname,ulname,uemail) VALUES ("Aayush","Lastname","aayush@gmail.com");

INSERT INTO onlinelibrary.user_credencials(username,password,uid) VALUES ("batman","batman",1);
INSERT INTO onlinelibrary.user_credencials(username,password,uid) VALUES ("reddy","reddy",2);
INSERT INTO onlinelibrary.user_credencials(username,password,uid) VALUES ("aayush","aayush",3);

INSERT INTO onlinelibrary.validators(vdate,vscore,vfaults,vuid) VALUES ("24/12/2020",15,1,2);

INSERT INTO onlinelibrary.donators(ddate,dscore,dfaults,duid) VALUES ("23/12/2020",30,1,3);

INSERT INTO onlinelibrary.documents(dolink,dotype,dolikes,dodislikes,doreport,dostatus,dovalid,dodid) VALUES ("https://genxclub.github.io/","docslink",10,2,0,"PUBLIC","VALID",1);
INSERT INTO onlinelibrary.documents(dolink,dotype,dolikes,dodislikes,doreport,dostatus,dovalid,dodid) VALUES ("https://www.youtube.com/watch?v=mapqovPazRY","ytvideo",24,5,2,"PUBLIC","VALID",1);
INSERT INTO onlinelibrary.documents(dolink,dotype,dolikes,dodislikes,doreport,dostatus,dovalid,dodid) VALUES ("https://scet.berkeley.edu/wp-content/uploads/BlockchainPaper.pdf","pdfdocs",2,0,0,"PUBLIC","VALID",1);

INSERT INTO onlinelibrary.validdocs(vdvid,vdoid) VALUES (1,1);
INSERT INTO onlinelibrary.validdocs(vdvid,vdoid) VALUES (1,2);
INSERT INTO onlinelibrary.validdocs(vdvid,vdoid) VALUES (1,3);

INSERT INTO onlinelibrary.tags(tname) VALUES ("Documents");
INSERT INTO onlinelibrary.tags(tname) VALUES ("WEB PROJECT");
INSERT INTO onlinelibrary.tags(tname) VALUES ("Blockchain");

INSERT INTO onlinelibrary.tagref(tgdoid,tgtid) VALUES (1,1);
INSERT INTO onlinelibrary.tagref(tgdoid,tgtid) VALUES (2,2);
INSERT INTO onlinelibrary.tagref(tgdoid,tgtid) VALUES (3,1);
INSERT INTO onlinelibrary.tagref(tgdoid,tgtid) VALUES (3,3);
