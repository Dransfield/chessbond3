md5=require("MD5");
module.exports = {
	
	ResetPassword:function(req,res){
		console.log(req.param('code'));
		 User.findOne({
      passwordcode: req.param('code')
	},function foundUser(err,user){
		if (!err){
			if(user)
			{
			user.password=md5(req.param('psw'));
			user.passwordcode="";
			user.save();
			return res.ok(user);
			}
			else
			{
			return res.notFound();
				
			}
			}
	else
	{return (err);}
	}
	);
	},
	SendMail:function(req,res){
		 User.findOne({
      email: req.param('address')
	},function foundUser(err,user){
		if (!err){
			if(!user)
			{return res.notFound();}
			else
			{
		var nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
//		var transporter = nodemailer.createTransport('smtps://slenkar@gmail.com:mouthwash78@smtp.gmail.com');
	/*	
		var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'slenkar@gmail.com',
    pass: 'mouthwash78'
  }
});
*/

	 var code=md5(Date.now()+user.id);
    
    user.passwordcode =code;
    user.save();
    console.log("code "+code);
    var adrString="http://www.chessbond.com/forgot/password/"+code;
  const sendmail = require('sendmail')();
 
sendmail({
    from: 'admin@chessbond.com',
    to: "req.param('address') ",
    subject: 'Forgotten Password',
    html: '<h1>Chessbond</h1><br><a href='"+adrString+"'>Click Here to reset your password</a>',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
    /*
	var mailOptions = {
    from: '"Prakash" <admin@chessbond.com>', // sender address
    to: req.param('address'), // list of receivers
    subject: 'Forgotten Password', // Subject line
    text: 'Here is your link to reset your password:', // plaintext body
    
    html: "<h1>Chessbond</h1><br><a href='"+adrString+"'>Click Here to reset your password</a>" // html body
};
*/
// send mail with defined transport object
/*
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    else
    {return res.ok();}
    console.log('Message sent: ' + info.response);
	});
	*/
	
	}
}
});
}
};
