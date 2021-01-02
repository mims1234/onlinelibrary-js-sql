module.exports = {
    getAuthSignout: async(req,res) => {

        req.session.alertMsg=null;

        try{
            req.session.alertMsg=`${req.session.Name}, Logged Out`
            req.session.loggedin= false,
            req.session.userid= null,
            req.session.roleid= null
            req.session.Name= null
            req.session.alertInfo = true;
            res.redirect('/')
        }catch(e){
            req.session.alertMsg = 'ERROR:505'

            res.redirect('/')
        }
    },

    getAuthLogin: async(req,res) => {

        req.session.alertMsg=null;

        var username = req.body.username;
        var password = req.body.password;

        var email = req.body.email;
        var fname = req.body.fname;
        var lname = req.body.lname;

        var signtype = req.body.signValue;
        var signinValue = '/'

        if(signtype==="signin"){
            if(username && password) 
            {
                db.query(`SELECT * FROM user_credencials UC, user_profile UP WHERE UC.UCusername="${username}" AND UC.UCpassword="${password}" AND UC.UCuid=UP.Uid`, function(error,results, fields, row){
                    if(error){
                        console.log(error)
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        if (results.length > 0) {
                            req.session.loggedin = true;
                            req.session.userid = results[0].Uid;
                            req.session.roleid = results[0].UCrole
                            req.session.Name=results[0].Ulname;

                            req.session.alertMsg=`${req.session.Name}, Logged In`
                            req.session.alertInfo = true;
                            res.redirect(`${signinValue}`);
                        } else {
                            req.session.loggedin = undefined;
                            req.session.alertInfo = true;
                            req.session.alertMsg = 'Invalid Sign-In'
                            res.redirect(`${signinValue}`);
                        }	
                    }
                })
            }
            else{
                req.session.loggedin = false;
                req.session.alertInfo = true;
                req.session.alertMsg = 'Missing Details'
                res.redirect(`${signinValue}`);
            }
        }
        else if(signtype==="signup"){
            if(username && password && email && fname && lname) 
            {
                db.query(`SELECT * FROM user_credencials WHERE UCusername="${username}" AND UCpassword="${password}"`, function(error,results, fields, row){
                    if(error){
                        req.session.loggedin = undefined;
                        req.session.alertInfo = true;
                        req.session.alertMsg = 'Database Server Down'
                        res.redirect(`${signinValue}`);
                    }
                    else{
                        if (results.length < 1) {
                            db.query(`INSERT INTO user_profile (Ufname,Ulname,Uemail) VALUES ("${fname}","${lname}","${email}")`, function(error, results, fields, rows){
                                if(error){
                                    console.log(error)
                                    req.session.loggedin = undefined;
                                    req.session.alertInfo = true;
                                    req.session.alertMsg = 'Database Server Down'
                                    res.redirect(`${signinValue}`);
                                }
                                else{
                                    db.query(`SELECT Uid FROM user_profile`, function(error, UCresults, fields, rows){
                                        if(error){
                                            console.log(error)
                                            req.session.loggedin = undefined;
                                            req.session.alertInfo = true;
                                            req.session.alertMsg = 'Database Server Down'
                                            res.redirect(`${signinValue}`);
                                        }
                                        else{
                                            db.query(`INSERT INTO user_credencials (UCusername,UCpassword,UCuid,UCrole) VALUES ("${username}","${password}",${UCresults[UCresults.length-1].Uid},1)`, function(error, noresults, fields, rows){
                                                if(error){
                                                    console.log(error)
                                                    req.session.loggedin = undefined;
                                                    req.session.alertInfo = true;
                                                    req.session.alertMsg = 'Database Server Down'
                                                    res.redirect(`${signinValue}`);
                                                }
                                                else{
                                                    req.session.loggedin = true;
                                                    req.session.userid = results.insertId;
                                                    req.session.roleid = 1
                                                    req.session.Name=lname;
                                                    
                                                    req.session.alertInfo = true;
                                                    req.session.alertMsg=`${lname} Account Registered`
                                                    res.redirect(`${signinValue}`);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            req.session.loggedin = undefined;
                            req.session.alertInfo = true;
                            req.session.alertMsg = 'Account Already Exist'
                            res.redirect(`${signinValue}`);
                        }	
                    }
                })
            }
            else{
                req.session.loggedin = false;
                req.session.alertInfo = true;
                req.session.alertMsg = 'Missing Details'
                res.redirect(`${signinValue}`);
            }
        }
        else{
            req.session.loggedin = false;
            req.session.alertInfo = true;
            req.session.alertMsg = 'ERROR:505'
            res.redirect(`${signinValue}`);
        }
    }
}