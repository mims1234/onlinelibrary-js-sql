module.exports = {

    getValidPost: async(req,res) => {

        req.session.alertMsg=null;

        var postID = req.body.postID;
        var signinValue = "/validatorpost";

        if(postID) 
        {
            try{
                db.query(`UPDATE documents D SET D.DOstatus="PUBLIC" WHERE D.DOid=${postID}`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        console.log(`Document made Public`)
                        req.session.alertMsg=`Document has been made Public`
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

    getRejectPost: async(req,res) => {

        req.session.alertMsg=null;

        var postID = req.body.postID;
        var signinValue = "/validatorpost";

        if(postID) 
        {
            try{
                db.query(`UPDATE documents D SET D.DOstatus="REJECTED" WHERE D.DOid=${postID}`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        console.log(`Document Rejected`)
                        req.session.alertMsg=`Document has been Rejected`
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

    getIgnoreReport: async(req,res) => {

        req.session.alertMsg=null;

        var postID = req.body.postID;
        var signinValue = "/validatorpost";

        if(postID) 
        {
            try{
                db.query(`UPDATE documents D SET D.DOreport=0 WHERE D.DOid=${postID}`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        console.log(`Report Ignored`)
                        req.session.alertMsg=`Report Ignored`
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

    getAcceptReport: async(req,res) => {

        req.session.alertMsg=null;

        var postID = req.body.postID;
        var signinValue = "/validatorpost";

        if(postID) 
        {
            try{
                db.query(`UPDATE documents D SET D.DOstatus="BLOCKED" WHERE D.DOid=${postID}`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        console.log(`Report Ignored`)
                        req.session.alertMsg=`Report Ignored`
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

    getRedirectPage: async(req,res) => {

        LINK=req.body.Link
        DocID=req.body.DocID
        signinValue="/"
        if(DocID && LINK) 
        {
            try{
                db.query(`UPDATE documents D SET D.DOviews=D.DOviews+1 WHERE D.DOid=${DocID}`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        res.render('redirect',{LINK})
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
    }
}