module.exports = {

		
	UploadToAlbum: function (req, res) {
	console.log("upload to album req.param('albumID') "+req.param('albumID'));
  req.file('avatar').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.negotiate(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }

	Album.find({id:req.param('albumID')}).exec(function createFindCB(error, createdOrFoundRecords){
	//console.log("error "+JSON.stringify(error));
	if (error) return res.negotiate(error);
	//console.log("createdOrFoundRecords "+JSON.stringify(createdOrFoundRecords[0]));
	Avatar.create({
	  avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.passport.user),
		user:req.session.passport.user,
      // Grab the first file and use it's `fd` (file descriptor)
      albumid:createdOrFoundRecords[0].id,
      avatarFd: uploadedFiles[0].fd
    }) .exec(function (err,ava){
      if (err) return res.negotiate(err);
      
    // Save the "fd" and the url where the avatar for a user can be accessed
    User.update(req.session.passport.user, {

      // Generate a unique URL where the avatar can be downloaded.
      avatarid:ava.id,
      picture:'https://www.chessbond.com/user/avatar/'+ava.id
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.redirect('/album/'+createdOrFoundRecords[0].id);
     // /'+req.session.passport.user);
    });
  });

	});

	
  
});
    
  
 
},
	
	Upload: function (req, res) {
console.log("just upload");
  req.file('avatar').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.negotiate(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }

	Album.findOrCreate({name:"Profile Images",user:req.session.passport.user}, {name:"Profile Images",user:req.session.passport.user}).exec(function createFindCB(error, createdOrFoundRecords){
	if (error) return res.negotiate(error);
	Avatar.create({
	  avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.passport.user),
		user:req.session.passport.user,
      // Grab the first file and use it's `fd` (file descriptor)
      albumid:createdOrFoundRecords.id,
      avatarFd: uploadedFiles[0].fd
    }) .exec(function (err,ava){
      if (err) return res.negotiate(err);
      
    // Save the "fd" and the url where the avatar for a user can be accessed
    User.update(req.session.passport.user, {

      // Generate a unique URL where the avatar can be downloaded.
      avatarid:ava.id,
      picture:'https://www.chessbond.com/user/avatar/'+ava.id
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.redirect('/album/'+createdOrFoundRecords.id);
     // /'+req.session.passport.user);
    });
  });

	});

	
  
});
    
  
 
},


/**
 * Download avatar of the user with the specified id
 *
 * (GET /user/avatar/:id)
 */
avatar: function (req, res){

  req.validate({
    id: 'string'
  });

  Avatar.findOne(req.param('id')).exec(function (err, user){
    if (err) return res.negotiate(err);
    if (!user) return res.notFound();

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!user.avatarFd) {
      return res.notFound();
    }
	if(user.blocked==true)
	{
		return res.notFound();
	}
	
    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // set the filename to the same file as the user uploaded
    res.set("Content-disposition", "attachment; filename='pic.jpg'");

    // Stream the file down
    fileAdapter.read(user.avatarFd)
    .on('error', function (err){
      return res.serverError();
    })
    .pipe(res);
  });
}
};
