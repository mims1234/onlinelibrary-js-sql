module.exports = {

    getHomePage:async(req,res)=>{
        try{

            // console.log(`HOME1: ${req.session.alertMsg}`)
            if(req.session.loggedin==undefined && !req.session.alertMsg){
                // console.log(`HOME: RESET`)
                req.session.loggedin= false
                req.session.userid= null
                req.session.roleid= null
                req.session.Name= null
                req.session.alertMsg = null
                req.session.alertInfo = false
            }
            if(req.session.alertInfo===false) req.session.alertMsg = null
            if(req.session.alertInfo===true) req.session.alertInfo = false
            // console.log(`HOME: ${req.session.userid}`)

            db.query(`SELECT TR.TGtid as "ID", COUNT(*) AS "count", T.Tname AS "name" FROM tags T, tagref TR, documents D WHERE TR.TGtid=T.Tid AND TR.TGdid=D.DOid AND D.DOstatus="PUBLIC" AND D.DOreport=0 GROUP BY TGtid`, function(error, tags, fields, rows){
                if(error){
                    console.log(error)
                    req.session.loggedin = undefined;
                    req.session.alertInfo = true;
                    req.session.alertMsg = 'Database Server Down'
                    res.redirect(`${signinValue}`);
                }
                else{
                    res.render("home",{
                        loggedin:`${req.session.loggedin}`,
                        userName:`${req.session.Name}`,
                        roleid:`${req.session.roleid}`,
                        userid:`${req.session.userid}`,
                        alertMsg:`${req.session.alertMsg}`,
                        tags
                    })
                }
            })
        }catch(e){
            req.session.alertInfo = true;
            req.session.alertMsg = 'ERROR:505'
            // res.send("TESTING HOME ERROR")
            res.redirect('/')
        }
    },

    getDashboardPage:async(req,res)=>{
        class TagNamesClass{
            constructor(DocID){
                this.DocID=DocID;
                this.TagNames=[];
            }
        }

        try{
            if(req.session.loggedin==undefined){
                // console.log(`HOME: RESET`)
                req.session.loggedin= false
                req.session.userid= null
                req.session.roleid= null
                req.session.Name= null
                req.session.alertMsg = null
                req.session.alertInfo = false
            }
            if(req.session.alertInfo===false) req.session.alertMsg = null
            if(req.session.alertInfo===true) req.session.alertInfo = false

            if(req.session.loggedin===true){
                db.query(`SELECT * FROM documents D, user_profile U WHERE D.DOuid=U.Uid AND D.DOuid=${req.session.userid} ORDER BY D.DOviews DESC`, function(error, dashdocs, fields, rows){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        db.query(`SELECT D.DOid AS "DocID", T.Tname AS "TagName" FROM documents D, tagref TR, tags T WHERE D.DOid=TR.TGdid AND TR.TGtid=T.Tid AND D.DOuid=${req.session.userid} ORDER BY D.DOviews DESC`, function(error, dashtags, fields, rows){
                            if(error){
                                console.log(error)
                                req.session.loggedin = undefined;
                                req.session.alertInfo = true;
                                req.session.alertMsg = 'Database Server Down'
                                res.redirect(`${signinValue}`);
                            }
                            else{
                                TagList = []
                                dashdocs.forEach((element,index)=>{
                                    dashtags.forEach((i,j) => {
                                        if(element.DOid==i.DocID){
                                            if(!TagList[element.DOid]){
                                                TagList[element.DOid]= new TagNamesClass(i.DocID)
                                            }
                                            if(TagList[element.DOid]){
                                                TagList[element.DOid].TagNames.push(i.TagName)
                                            }
                                        }
                                    })
                                })
                                newDashTags=JSON.stringify(TagList)
                                newDashDocs=JSON.stringify(dashdocs)
                                chartObjectArray = dashdocs.slice(0,10)
                                chartViewsArray=[]
                                chartDocsArray=[]
                                chartObjectArray.forEach((element,index) => {
                                    chartViewsArray.push(element.DOviews)
                                    chartDocsArray.push(element.DOtitle)
                                })
                                res.render("dashboard",{
                                    loggedin:`${req.session.loggedin}`,
                                    userName:`${req.session.Name}`,
                                    roleid:`${req.session.roleid}`,
                                    userid:`${req.session.userid}`,
                                    alertMsg:`${req.session.alertMsg}`,
                                    dashdocs,newDashTags,newDashDocs,
                                    chartViewsArray,chartDocsArray
                                })
                            }
                        })
                    }
                })
            } else {
                req.session.alertMsg = 'Missing Access'
                req.session.alertInfo = true;
                res.redirect('/')
            }
        }catch(e){
            req.session.alertMsg = 'ERROR:505'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },

    getMembersPage :async(req,res)=>{
        try{
            if(req.session.loggedin==undefined){
                req.session.loggedin= false
                req.session.userid= null
                req.session.roleid= null
                req.session.Name= null
                req.session.alertMsg = null
                req.session.alertInfo = false
            }
            if(req.session.alertInfo===false) req.session.alertMsg = null
            if(req.session.alertInfo===true) req.session.alertInfo = false

            signinValue="/members"
            newMembersList = []

            if(req.session.loggedin===true){
                db.query(`SELECT * FROM user_profile U, user_credencials UC WHERE U.Uid=UC.UCuid`, function(error, members, fields, rows){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        newMembersList=JSON.stringify(members)
                        // res.send(JSON.stringify(results))
                        db.query(`SELECT U.Uid as "userID" , COUNT(*) AS "count", SUM(DT.DOviews) AS "views" FROM user_profile U, user_credencials UC, documents DT WHERE U.Uid=UC.UCuid AND U.Uid=DT.DOuid AND DT.DOstatus="PUBLIC" GROUP BY U.Uid`, function(error, memberpostcounts, fields, rows){
                            if(error){
                                console.log(error)
                                req.session.loggedin = undefined;
                                req.session.alertInfo = true;
                                req.session.alertMsg = 'Database Server Down'
                                res.redirect(`${signinValue}`);
                            }
                            else{
                                newMembersList=JSON.stringify(members)
                                // res.send(JSON.stringify(results))
                                members.forEach((element,index) => {
                                    memberpostcounts.forEach((data,i)=>{
                                        if(element.Uid===memberpostcounts[i].userID && memberpostcounts[i].count){
                                            members[index].counts = memberpostcounts[i].count;
                                            members[index].views = memberpostcounts[i].views;
                                        }
                                        if(!members[index].counts){
                                            members[index].counts = 0;
                                            members[index].views = 0;
                                        }
                                    })
                                });
                                // res.send(JSON.stringify(members))
                                res.render("members",{
                                    loggedin:`${req.session.loggedin}`,
                                    userName:`${req.session.Name}`,
                                    roleid:`${req.session.roleid}`,
                                    userid:`${req.session.userid}`,
                                    alertMsg:`${req.session.alertMsg}`,
                                    members,newMembersList
                                })
                            }
                        })
                    }
                })
            } else {
                req.session.alertMsg = 'Missing Access'
                req.session.alertInfo = true;
                res.redirect('/')
            }
        }catch(e){
            req.session.alertMsg = 'ERROR:500'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },

    getProfilePage:async(req,res)=>{
        try{
            if(req.session.loggedin==undefined){
                req.session.loggedin= false
                req.session.userid= null
                req.session.roleid= null
                req.session.Name= null
                req.session.alertMsg = null
                req.session.alertInfo = false
            }
            if(req.session.alertInfo===false) req.session.alertMsg = null
            if(req.session.alertInfo===true) req.session.alertInfo = false

            if(req.session.loggedin===true){
                db.query(`SELECT * FROM user_credencials UC, user_profile U WHERE U.uid=${req.session.userid} AND U.uid=UC.UCuid`, function(error, profile, fields, rows){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        // res.send(JSON.stringify(results))
                        res.render("profile",{
                            loggedin:`${req.session.loggedin}`,
                            userName:`${req.session.Name}`,
                            roleid:`${req.session.roleid}`,
                            userid:`${req.session.userid}`,
                            alertMsg:`${req.session.alertMsg}`,
                            profile
                        })
                    }
                })
            } else {
                req.session.alertMsg = 'Missing Access'
                req.session.alertInfo = true;
                res.redirect('/')
            }
        }catch(e){
            req.session.alertMsg = 'ERROR:500'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },

    getTopicPage:async(req,res)=>{
        try{

            if(req.session.loggedin==undefined && !req.session.alertMsg){
                req.session.loggedin= false
                req.session.userid= null
                req.session.roleid= null
                req.session.Name= null
                req.session.alertMsg = null
                req.session.alertInfo = false
            }
            console.log(req.session.loggedin)
            if(req.session.alertInfo===false) req.session.alertMsg = null
            if(req.session.alertInfo===true) req.session.alertInfo = false

            signinValue="/"
            tagID = req.body.tagID;
            tagCount = req.body.tagCount;
            tagName = req.body.tagName;

            db.query(`SELECT * FROM documents D, tagref TR, tags T, user_profile U WHERE D.DOid=TR.TGdid AND D.DOuid=U.Uid AND TR.TGtid=T.Tid AND T.Tname="${tagName}" AND D.DOreport=0 AND DOstatus="PUBLIC"`, function(error, docs, fields, rows){
                if(error){
                    console.log(error)
                    req.session.loggedin = undefined;
                    req.session.alertInfo = true;
                    req.session.alertMsg = 'Database Server Down'
                    res.redirect(`${signinValue}`);
                }
                else{
                    newDocsList=JSON.stringify(docs)
                    res.render("topic",{
                        loggedin:`${req.session.loggedin}`,
                        userName:`${req.session.Name}`,
                        roleid:`${req.session.roleid}`,
                        userid:`${req.session.userid}`,
                        alertMsg:`${req.session.alertMsg}`,
                        tagCount,tagName,docs,newDocsList
                    })
                }
            })
        }catch(e){
            console.log(e)
            req.session.alertMsg = 'ERROR:505'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },

    getValidatorPostPage: async(req,res)=>{

        class TagNamesClass{
            constructor(DocID){
                this.DocID=DocID;
                this.TagNames=[];
            }
        }

        try{
            if(req.session.loggedin==undefined){
                // console.log(`HOME: RESET`)
                req.session.loggedin= false
                req.session.userid= null
                req.session.roleid= null
                req.session.Name= null
                req.session.alertMsg = null
                req.session.alertInfo = false
            }
            if(req.session.alertInfo===false) req.session.alertMsg = null
            if(req.session.alertInfo===true) req.session.alertInfo = false

            if(req.session.loggedin===true){
                db.query(`SELECT * FROM documents D, user_profile U WHERE D.DOuid=U.Uid AND D.DOstatus="CHECKING"`, function(error, validateDocs, fields, rows){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        db.query(`SELECT * FROM documents D, user_profile U WHERE D.DOuid=U.Uid AND D.DOreport=1 AND D.DOstatus="PUBLIC"`, function(error, reportedDocs, fields, rows){
                            if(error){
                                console.log(error)
                                req.session.loggedin = undefined;
                                req.session.alertInfo = true;
                                req.session.alertMsg = 'Database Server Down'
                                res.redirect(`${signinValue}`);
                            }
                            else{
                                newValidateDocs = JSON.stringify(validateDocs)
                                newReportedDocs = JSON.stringify(reportedDocs)
                                db.query(`SELECT D.DOid AS "DocID", T.Tname AS "TagName" FROM documents D, tagref TR, tags T WHERE D.DOid=TR.TGdid AND TR.TGtid=T.Tid`, function(error, dashtags, fields, rows){
                                    if(error){
                                        console.log(error)
                                        req.session.loggedin = undefined;
                                        req.session.alertInfo = true;
                                        req.session.alertMsg = 'Database Server Down'
                                        res.redirect(`${signinValue}`);
                                    }
                                    else{
                                        TagList = []
                                        dashtags.forEach((i,j) => {
                                            if(!TagList[i.DocID]){
                                                TagList[i.DocID]= new TagNamesClass(i.DocID)
                                            }
                                            if(TagList[i.DocID]){
                                                TagList[i.DocID].TagNames.push(i.TagName)
                                            }
                                        })
                                        newDashTags=JSON.stringify(TagList)
                                        res.render("validatorpost",{
                                            loggedin:`${req.session.loggedin}`,
                                            userName:`${req.session.Name}`,
                                            roleid:`${req.session.roleid}`,
                                            userid:`${req.session.userid}`,
                                            alertMsg:`${req.session.alertMsg}`,
                                            validateDocs,reportedDocs,
                                            newValidateDocs,newReportedDocs,
                                            newDashTags
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                req.session.alertMsg = 'Missing Access'
                req.session.alertInfo = true;
                res.redirect('/')
            }
        }catch(e){
            req.session.alertMsg = 'ERROR:505'
            req.session.alertInfo = true;
            res.redirect('/')
        }
    },
}