const { reset } = require("nodemon");

module.exports = {

    getPostAdded:async(req,res)=>{
        try{
            Title = req.body.title;
            Type = req.body.type;
            Link = req.body.link;
            Description = req.body.desc;
            Tags = req.body.tags
            Tags = Tags.split(",")
            TagsArray = []
            Tags.forEach(element => {
                Temp = element.replace(/[^a-zA-Z ]/g, "").trim()
                TagsArray.push(Temp.toUpperCase())
            });
            signinValue="/"

            db.query(`SELECT Tname FROM tags`, function(error, tagsResult, fields, rows){
                if(error){
                    console.log(error)
                    req.session.loggedin = undefined;
                    req.session.alertInfo = true;
                    req.session.alertMsg = 'Database Server Down'
                    res.redirect(`${signinValue}`);
                }else{
                    newarr = []
                    tagsResult.forEach((element,index)=>{newarr.push(tagsResult[index].Tname)})
                    TagsArray.forEach(element => {
                        if(!newarr.includes(element)){
                            db.query(`INSERT INTO tags (Tname) VALUES ("${element}")`, function(error, results, fields, rows){
                                if(error){
                                    console.log(error)
                                    req.session.loggedin = undefined;
                                    req.session.alertInfo = true;
                                    req.session.alertMsg = 'Database Server Down'
                                    res.redirect(`${signinValue}`);
                                }
                            });
                        }
                    })
                
                    db.query(`INSERT INTO documents (DOlink,DOtype,DOreport,DOstatus,DOviews,DOuid,DOdesc,DOtitle) VALUES ("${Link}","${Type}",0,"CHECKING",0,${req.session.userid},"${Description}","${Title}")`, function(error, docsresults, fields, rows){
                        if(error){
                            console.log(error)
                            req.session.loggedin = undefined;
                            req.session.alertInfo = true;
                            req.session.alertMsg = 'Database Server Down'
                            res.redirect(`${signinValue}`);
                        }else{
                            db.query(`SELECT * FROM tags`, function(error, tagslist, fields, rows){
                                if(error){
                                    console.log(error)
                                    req.session.loggedin = undefined;
                                    req.session.alertInfo = true;
                                    req.session.alertMsg = 'Database Server Down'
                                    res.redirect(`${signinValue}`);
                                }else{
                                    tagNames = []
                                    tagslist.forEach((element,index)=>{
                                        tagNames[parseInt(tagslist[index].Tid)] = tagslist[index].Tname
                                    })
                                    tagNames.forEach((element,index) => {
                                        TagsArray.forEach((i,j) => {
                                            if(element.toUpperCase()===i){
                                                db.query(`INSERT INTO tagref (TGdid,TGtid) VALUES (${docsresults.insertId},${index})`, function(error, results, fields, rows){
                                                    if(error){
                                                        console.log(error)
                                                        req.session.loggedin = undefined;
                                                        req.session.alertInfo = true;
                                                        req.session.alertMsg = 'Database Server Down'
                                                        res.redirect(`${signinValue}`);
                                                    }
                                                });
                                            }
                                        })
                                    })
                                    req.session.alertMsg=`Post Added`
                                    req.session.alertInfo = true;
                                    res.redirect(`${signinValue}`);
                                }
                            });
                        }
                    });
                }
            });
        }catch(e){
            req.session.alertMsg = 'ERROR:505'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },

    getPostEdited:async(req,res)=>{
        try{
            Title = req.body.title;
            Type = req.body.type;
            Link = req.body.link;
            Description = req.body.desc;
            DocID=req.body.docID;

            Tags = req.body.tags
            Tags = Tags.split(",")
            TagsArray = []
            Tags.forEach(element => {
                Temp = element.replace(/[^a-zA-Z ]/g, "").trim()
                TagsArray.push(Temp.toUpperCase())
            });
            TagsArray = TagsArray.filter(onlyUnique)
            signinValue="/dashboard"

            if(Title && Type && Link && Description && DocID && Tags){
                db.query(`SELECT Tname FROM tags`, function(error, tagsResult, fields, rows){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }else{
                        newarr = []
                        tagsResult.forEach((element,index)=>{newarr.push(tagsResult[index].Tname)})
                        TagsArray.forEach(element => {
                            if(!newarr.includes(element)){
                                db.query(`INSERT INTO tags (Tname) VALUES ("${element}")`, function(error, results, fields, rows){
                                    if(error){
                                        console.log(error)
                                        req.session.loggedin = undefined;
                                        req.session.alertInfo = true;
                                        req.session.alertMsg = 'Database Server Down'
                                        res.redirect(`${signinValue}`);
                                    }
                                });
                            }
                        })

                        db.query(`SELECT * FROM tagref WHERE TGdid=${DocID}`, function(error, doctagslist, fields, rows){
                            if(error){
                                console.log(error)
                                req.session.loggedin = undefined;
                                req.session.alertInfo = true;
                                req.session.alertMsg = 'Database Server Down'
                                res.redirect(`${signinValue}`);
                            }else{
                                doctagslist.forEach((elementdel,index) => {
                                    db.query(`DELETE FROM tagref WHERE TGdid=${elementdel.TGdid} AND TGtid=${elementdel.TGtid}`, function(error, deletedtags, fields, rows){
                                        if(error){
                                            console.log(error)
                                            req.session.loggedin = undefined;
                                            req.session.alertInfo = true;
                                            req.session.alertMsg = 'Database Server Down'
                                            res.redirect(`${signinValue}`);
                                        } else {
                                            console.log("TAGS REMOVED")
                                        }
                                    });
                                })
                            }
                        })

                        db.query(`UPDATE documents D SET D.DOlink="${Link}", D.DOtype="${Type}",D.DOdesc="${Description}", D.DOtitle="${Title}" WHERE D.DOid=${DocID}`, function(error, docsresults, fields, rows){
                            if(error){
                                console.log(error)
                                req.session.loggedin = undefined;
                                req.session.alertInfo = true;
                                req.session.alertMsg = 'Database Server Down'
                                res.redirect(`${signinValue}`);
                            }else{
                                db.query(`SELECT * FROM tags`, function(error, tagslist, fields, rows){
                                    if(error){
                                        console.log(error)
                                        req.session.loggedin = undefined;
                                        req.session.alertInfo = true;
                                        req.session.alertMsg = 'Database Server Down'
                                        res.redirect(`${signinValue}`);
                                    }else{
                                        tagNames = []
                                        tagslist.forEach((element,index)=>{
                                            tagNames[parseInt(tagslist[index].Tid)] = tagslist[index].Tname
                                        })
                                        tagNames.forEach((element,index) => {
                                            TagsArray.forEach((i,j) => {
                                                if(element.toUpperCase()===i){
                                                    db.query(`INSERT INTO tagref (TGdid,TGtid) VALUES (${DocID},${index})`, function(error, results, fields, rows){
                                                        if(error){
                                                            console.log(error)
                                                            req.session.loggedin = undefined;
                                                            req.session.alertInfo = true;
                                                            req.session.alertMsg = 'Database Server Down'
                                                            res.redirect(`${signinValue}`);
                                                        }
                                                    });
                                                }
                                            })
                                        })
                                        req.session.alertMsg=`Post Edited`
                                        req.session.alertInfo = true;
                                        res.redirect(`${signinValue}`);
                                    }
                                });
                            }
                        });
                    }
                });
            }else{
                req.session.alertMsg = 'Details Missing'
                req.session.alertInfo = true;
                res.redirect('/')
            }
        }catch(e){
            req.session.alertMsg = 'ERROR:505'
            req.session.alertInfo = true;
            res.redirect('/')
        }

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
    },


    getProfileUpdated: (req,res) => {

        req.session.alertMsg=null;

        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var fname = req.body.fname;
        var lname = req.body.lname;

        var signinValue = req.body.signAddress;

        if(username && password && email && fname && lname) 
        {
            try{
                db.query(`SELECT * FROM user_profile U WHERE U.Uid="${req.session.userid}"`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        if (results.length > 0) {
                            db.query(`UPDATE user_profile U SET U.Ufname="${fname}", U.Ulname="${lname}", U.Uemail="${email}" WHERE U.Uid=${req.session.userid}`, function(error,results, fields, row){
                                if(error){
                                    console.log(error)
                                    req.session.loggedin = undefined;
                                    req.session.alertInfo = true;
                                    req.session.alertMsg = 'Database Server Down'
                                    res.redirect(`${signinValue}`);
                                }
                                else{
                                    req.session.Name=lname;
                                    db.query(`UPDATE user_credencials UC SET UC.UCusername="${username}", UC.UCpassword="${password}" WHERE UC.UCuid=${req.session.userid}`, function(error,results, fields, row){
                                        if(error){
                                            console.log(error)
                                            req.session.loggedin = undefined;
                                            req.session.alertInfo = true;
                                            req.session.alertMsg = 'Database Server Down'
                                            res.redirect(`${signinValue}`);
                                        }
                                        else{
                                            req.session.alertMsg=`${req.session.Name}, Profile Updated`
                                            req.session.alertInfo = true;
                                            res.redirect(`${signinValue}`);
                                        }
                                    })
                                }
                            })
                        } else {
                            console.log("DOESNT EXIST IN user_profile")
                            req.session.loggedin = undefined;
                            req.session.alertMsg = 'Invalid Profile Update'
                            res.redirect(`${signinValue}`);
                        }	
                    }
                })
            } catch(e){
                console.log(error)
                req.session.loggedin = undefined;
                req.session.alertInfo = true;
                req.session.alertMsg = 'CODE ERROR'
                res.redirect(`${signinValue}`);
            }
        }
        else{
            console.log("MISSING DETAILS")
            req.session.loggedin = false;
            req.session.alertInfo = true;
            req.session.alertMsg = 'Missing Details'
            res.redirect(`${signinValue}`);
        }
    },

    getMemberRoleUpdate: (req,res) => {

        req.session.alertMsg=null;

        var memberID = req.body.memberID;
        var memberRole = req.body.memberRole;

        var signinValue = "/members";

        if(memberRole==="2")memberUpdateRole=1
        if(memberRole==="1")memberUpdateRole=2

        if(memberID && memberRole) 
        {
            try{
                db.query(`SELECT * FROM user_profile U WHERE U.Uid="${memberID}"`, function(error,profileResults, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        if (profileResults.length > 0) {
                            db.query(`UPDATE user_credencials UC SET UC.UCrole="${memberUpdateRole}" WHERE UC.UCuid=${memberID}`, function(error,results, fields, row){
                                if(error){
                                    console.log(error)
                                    req.session.loggedin = undefined;
                                    req.session.alertInfo = true;
                                    req.session.alertMsg = 'Database Server Down'
                                    res.redirect(`${signinValue}`);
                                }
                                else{
                                    console.log(`${profileResults[0].Ulname}, Member Role Updated`)
                                    req.session.alertMsg=`${profileResults[0].Ulname}, Member Role Updated`
                                    req.session.alertInfo = true;
                                    res.redirect(`${signinValue}`);
                                }
                            });
                        } else {
                            console.log("DOESNT EXIST IN user_profile")
                            req.session.loggedin = undefined;
                            req.session.alertMsg = 'Invalid Profile Update'
                            res.redirect(`${signinValue}`);
                        }	
                    }
                })
            } catch(e){
                console.log(error)
                req.session.loggedin = undefined;
                req.session.alertInfo = true;
                req.session.alertMsg = 'CODE ERROR'
                res.redirect(`${signinValue}`);
            }
        }
        else{
            console.log("MISSING DETAILS")
            req.session.loggedin = false;
            req.session.alertInfo = true;
            req.session.alertMsg = 'Missing Details'
            res.redirect(`${signinValue}`);
        }
    },

    getReportPost: (req,res) => {

        req.session.alertMsg=null;

        var postID = req.body.postID;
        var reportValue = req.body.reportValue;
        var signinValue = "/";

        if(reportValue===1){
            console.log("ALREADY REPORTED")
            req.session.loggedin = false;
            req.session.alertInfo = true;
            req.session.alertMsg = 'Document Already Reported'
            res.redirect(`${signinValue}`);
        }
        reportValue = 1;

        if(postID) 
        {
            try{
                db.query(`UPDATE documents D SET D.DOreport=${reportValue} WHERE D.DOid=${postID}`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        console.log(`Document has been Reported`)
                        req.session.alertMsg=`Document has been Reported`
                        req.session.alertInfo = true;
                        res.redirect(`${signinValue}`);
                    }
                });
            } catch(e){
                console.log(error)
                req.session.loggedin = undefined;
                req.session.alertInfo = true;
                req.session.alertMsg = 'CODE ERROR'
                res.redirect(`${signinValue}`);
            }
        }
        else{
            console.log("MISSING DETAILS")
            req.session.loggedin = false;
            req.session.alertInfo = true;
            req.session.alertMsg = 'Missing Details'
            res.redirect(`${signinValue}`);
        }
    },

    getPostDelete:async(req,res)=>{
        try{
            DocID=req.body.DocID;
            signinValue="/dashboard"


            db.query(`SELECT TR.TGid FROM tagref TR, documents D WHERE D.DOid=TR.TGdid AND D.DOid=${DocID}`, function(error, tagrefdelResult, fields, rows){
                if(error){
                    console.log(error)
                    req.session.loggedin = undefined;
                    req.session.alertInfo = true;
                    req.session.alertMsg = 'Database Server Down'
                    res.redirect(`${signinValue}`);
                }else{
                    tagrefdelResult.forEach((tagrefdel,index) => {
                        db.query(`DELETE FROM tagref WHERE TGid=${tagrefdel.TGid}`, function(error, deletedtags, fields, rows){
                            if(error){
                                console.log(error)
                                req.session.loggedin = undefined;
                                req.session.alertInfo = true;
                                req.session.alertMsg = 'Database Server Down'
                                res.redirect(`${signinValue}`);
                            }
                        });
                        if(tagrefdelResult.length-1==index){
                            db.query(`DELETE FROM documents WHERE DOid=${DocID}`, function(error, deletedtags, fields, rows){
                                if(error){
                                    console.log(error)
                                    req.session.loggedin = undefined;
                                    req.session.alertInfo = true;
                                    req.session.alertMsg = 'Database Server Down'
                                    res.redirect(`${signinValue}`);
                                } else {
                                    req.session.alertMsg=`Post Deleted`
                                    req.session.alertInfo = true;
                                    res.redirect(`${signinValue}`);
                                }
                            });
                        }
                    })
                }
            })
        }catch(e){
            req.session.alertMsg = 'ERROR:505'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },
}