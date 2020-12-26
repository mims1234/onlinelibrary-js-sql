INSERT INTO onlinelibrary.user_profile(Ufname,Ulname,Uemail) VALUES ("FBatman","Lastname","batman@gmail.com");
INSERT INTO onlinelibrary.user_profile(Ufname,Ulname,Uemail) VALUES ("Reddy","Lastname","reddy@gmail.com");
INSERT INTO onlinelibrary.user_profile(Ufname,Ulname,Uemail) VALUES ("Aayush","Lastname","aayush@gmail.com");

INSERT INTO onlinelibrary.user_credencials(UCusername,UCpassword,UCuid) VALUES ("batman","batman",1);
INSERT INTO onlinelibrary.user_credencials(UCusername,UCpassword,UCuid) VALUES ("reddy","reddy",2);
INSERT INTO onlinelibrary.user_credencials(UCusername,UCpassword,UCuid) VALUES ("aayush","aayush",3);

INSERT INTO onlinelibrary.validators(Vdate,Vscore,Vfaults,Vuid) VALUES ("24/12/2020",15,1,2);

INSERT INTO onlinelibrary.donators(Ddate,Dscore,Dfaults,Duid) VALUES ("23/12/2020",30,1,3);

INSERT INTO onlinelibrary.documents(DOlink,DOtype,DOlikes,DOdislikes,DOreport,DOstatus,DOvalid,DOdid) VALUES ("https://genxclub.github.io/","docslink",10,2,0,"PUBLIC","VALID",1);
INSERT INTO onlinelibrary.documents(DOlink,DOtype,DOlikes,DOdislikes,DOreport,DOstatus,DOvalid,DOdid) VALUES ("https://www.youtube.com/watch?v=mapqovPazRY","ytvideo",24,5,2,"PUBLIC","VALID",1);
INSERT INTO onlinelibrary.documents(DOlink,DOtype,DOlikes,DOdislikes,DOreport,DOstatus,DOvalid,DOdid) VALUES ("https://scet.berkeley.edu/wp-content/uploads/BlockchainPaper.pdf","pdfdocs",2,0,0,"PUBLIC","VALID",1);

INSERT INTO onlinelibrary.validdocs(VDvid,VDoid) VALUES (1,1);
INSERT INTO onlinelibrary.validdocs(VDvid,VDoid) VALUES (1,2);
INSERT INTO onlinelibrary.validdocs(VDvid,VDoid) VALUES (1,3);

INSERT INTO onlinelibrary.tags(Tname) VALUES ("Documents");
INSERT INTO onlinelibrary.tags(Tname) VALUES ("WEB PROJECT");
INSERT INTO onlinelibrary.tags(Tname) VALUES ("Blockchain");

INSERT INTO onlinelibrary.tagref(TGdoid,TGtid) VALUES (1,1);
INSERT INTO onlinelibrary.tagref(TGdoid,TGtid) VALUES (2,2);
INSERT INTO onlinelibrary.tagref(TGdoid,TGtid) VALUES (3,1);
INSERT INTO onlinelibrary.tagref(TGdoid,TGtid) VALUES (3,3);

INSERT INTO onlinelibrary.likesdislikesdocs(LDDuid,LDDdoid,LDDstatus) VALUES (1,1,"like");
INSERT INTO onlinelibrary.likesdislikesdocs(LDDuid,LDDdoid,LDDstatus) VALUES (1,2,"dislike");
INSERT INTO onlinelibrary.likesdislikesdocs(LDDuid,LDDdoid,LDDstatus) VALUES (2,1,"like");
INSERT INTO onlinelibrary.likesdislikesdocs(LDDuid,LDDdoid,LDDstatus) VALUES (2,2,"like");
INSERT INTO onlinelibrary.likesdislikesdocs(LDDuid,LDDdoid,LDDstatus) VALUES (3,2,"none");

INSERT INTO onlinelibrary.reportdocs(RDuid,RDdoid) VALUES (1,3);
