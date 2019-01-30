/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    
        logingoogle:function(req,res){
passport.authenticate('google',{ scope: ['profile','email'] })(req, res);
//passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] })(req, res);

	},
	googlecallback:function(req,res)
	{
	/*	if(req.session)
		{
		console.log("req.session:");
		var keys = Object.keys(req.session);
		for (x in keys)
		{console.log(JSON.stringify(keys[x]));}
		}
		
		if(req.session.passport)
		{
		console.log("req.session.passport");
		var keys = Object.keys(req.session.passport);
		for (x in keys)
		{console.log(JSON.stringify(keys[x]));}
		}
		
		if(req.session.cookie)
		{
		console.log("req.session.cookie");
	
		var keys = Object.keys(req.session.cookie);
		for (x in keys)
		{console.log(JSON.stringify(keys[x]));}
		}
		//console.log("REQ"+JSON.stringify(req));
		//console.log("RES"+JSON.stringify(res));
		*/
		 passport.authenticate('google',{
			  
            successRedirect : '/justloggedin',
            failureRedirect : '/',
            failureFlash: true
        })(req, res);;
	},
    
    logintwitter:function(req,res){
		
passport.authenticate('twitter')(req, res);
	},
	twittercallback:function(req,res)
	{
		
		 passport.authenticate('twitter',{
            successRedirect : '/justloggedin',
            failureRedirect : '/',
            failureFlash: true
        })(req, res);;
	},
	loginfacebook:function(req,res){
passport.authenticate('facebook',{ scope : [ 'email'] })(req, res);
	},
	facebookcallback:function(req,res)
	{
		
		 passport.authenticate('facebook',{
            successRedirect : '/justloggedin',
            failureRedirect : '/',
            failureFlash: true
        })(req, res);;
	},

register: function (req, res) {
	
    var params = {name:req.param('name'),email:req.param('email'),password:req.param('password')};
	console.log("TRIED TO REGISTER"+params.name);
	console.log("name "+ req.param('name'));
	User.find({ or : [
    { name: params.name },
    { email: params.email },
    
  ]}).exec(function(err1,user1){
  if(user1.length==0){
    User.create(params).exec(function(err, user) {
      if (err) {
        res.serverError(err);
      }
      else {
        res.send(user);
      }
    });
	}
	else
	{
	console.log(user1);
	
	if (user1[0].name.search(params.name)==0 && user1[0].email.search(params.email)==0)
		{return res.serverError("User with name and email exists");}
	
	if (user1[0].name===params.name)
		{
			return res.serverError("User with name already exists");
			
			}
		
		if (user1[0].email===params.email)
		{return res.serverError("User with name exists");}
		return res.serverError("general error");
	}
	});
  },
  
    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
           console.log("user is "+JSON.stringify(user));
            console.log(req.session.passport);
            console.log(req.session);
            console.log( JSON.stringify(req.session));
            
            req.session.passport={};
           req.session.passport.user=user.id;
           // req.logIn(user, function(err) {
               // if (err) res.send(err);
               // req.session.user=user;
                return res.send({
                    message: info.message,
                    user: user
                });
            //});

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        console.log("logging out");
        req.session.destroy();
        
        res.redirect('/');
        
    }
};


