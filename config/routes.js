/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

 'GET /':{view:'jqhp'},
	'GET /upcomingTournamentsWithTime':'TournamentController.upcomingTournamentsWithTime',
	'POST /JoinTournament':'Tournamententry.joinTournament',
	'POST /LeaveTournament':'Tournamententry.leaveTournament',
	'GET /tournamentview/:ID': {view:'tournamentview'},
	'GET /mytournaments/:ID': {view:'mytournaments'},
	'GET /getplayerstournamentgames': 'TournamentController.getPlayersGames',
	'POST /startprivateconversation':'PrivateConversationController.New',
	'POST /leftprivateconversation':'PrivateConversationController.Left',
	'GET /myprofilemg': {view: 'messagesjq'},
	'/myprof/:ID': {view:'privateconversationjq'},
	'POST /chatmsg':'PageController.chatmsg',
	'POST /sawmessage':'WallpostController.SawMessage',
	'POST /wantstodeletemessage':'WallpostController.wantsToDelete',
	'GET /opentournament':{view:'opentournamentjq'},
	'POST /startfollow':'FollowController.New',
	'GET /stats/:ID':{view:'statsjq'},
	'GET /stats':{view:'statsjq'},
	'GET /aboutus':{view:'aboutusjq'},
	'GET /termsofservice':{view:'termsosjq'},
	'GET /privacypolicy':{view:'privacypolicyjq'},
	'GET /sitemap':{view:'sitemapjq'},
	'GET /contactus':{view:'contactusjq'},
	//'GET /album/:ID': {view: 'album'},
	'GET /album/:ID': {view: 'albumjq'},
	'POST /newalbum':'AlbumController.makenew',
	//'GET /albums/:userID': {view: 'albums'},
	'GET /albums/:ID': {view: 'albumsjq'},
	
	
	'GET /user/avatar/:id':'UploadController.avatar',
	'/profile/:ID': {view:'profilejq'},
	//'/newprofile/:ID': {view:'profilejq'},
	
	'/profile': {view:'profilejq'},
	//'/newprofile': {view:'profilejq'},
	'GET /humanvshuman/:GameID':{view:'humanvshuman'},
	'GET /humanvshumannew/:ID':{view:'humanvshumanjq'},
	'GET /session/:SessionID':{view:'session'},
	'/ConfirmDeleteAccount':{view:'confirmdelete'},
	
	'GET /DeleteAccount':'UserController.DeleteAccount',
	'/DeletedAccount':{view:'accountdeleted'},
	'/justloggedinjq':{view:'justloggedinjq'},
	'/admin':{view:'adminjq'},
	'GET /UndeleteAccount':'UserController.UndeleteAccount',
	'/UndeletedAccount':{view:'accountundeleted'},
	'/playvsai':{view:'humanvsaijq'},
	'/forgot':{view:'forgotjq'},
	'GET /wholesitevisit':'UserController.visitedWholeSite',
	'PUT /updateuser':'UserController.updateProfile',
	'PUT /saveFen':'UserController.saveFen',
	'GET /locationforip':'CityController.getLocation',
	//'GET /profilealbum': {view: 'myfile'},
	//'/myfile2': {view: 'myfile2'}
//	'/tournamentjq':{view:'go'},
	'GET /registerpage':{view:'registerjq'},
	'GET /getmyfile':'FetchController.GetFile',
	//'GET /HomepageHeartbeat':'PageController.HomepageHeartbeat',
	/*'GET /countcities':'CityController.countcities',
	'GET /createcitydatabase':'CityController.CreateDatabase',
	*/
	'POST /uploadavatar':'UploadController.Upload',
	'POST /uploadavatar/:albumID':'UploadController.UploadToAlbum',
	'/justloggedin':'PageController.JustLoggedIn',
	'GET /updateGameTime':'ChessgameController.updateGameTime',
	'/MyLogout':'AuthController.logout',
	'PUT /joingame':'ChessgameController.Joingame',
	'PUT /imidle':'PageController.AnnounceIdle',
	'PUT /banuser':'UserController.banUser',
	'PUT /unbanuser':'UserController.unbanUser',
	'GET /ijustloggedin':'UserController.updateLoggedInTime',
	
	'PUT /wantrematch':'RematchController.WantRematch',
	'PUT /SendMail':'ForgotBackController.SendMail',
	'PUT /deleteavatar':'AvatarController.deletepic',
	'PUT /blockavatar':'AvatarController.blockpic',
	'PUT /unblockavatar':'AvatarController.unblockpic',
	'PUT /ResetPassword':'ForgotBackController.ResetPassword',
	'GET /forgot/password/:code':{view:'newpassword'},
	'PUT /Withdraw':'ChessgameController.Withdraw',
	'POST /Resign':'ChessgameController.Resign',
	'PUT /OfferDraw':'ChessgameController.OfferDraw',
 	'POST /AcceptDraw':'ChessgameController.AcceptDraw',
	'GET /subscribeToRoom':'PageController.subscribeToRoom',
	'PUT /newopengame':'ChessgameController.newopengame',
	'PUT /newsession':'PageController.newsession',
	'PUT /deleteopengame':'ChessgameController.deleteopengame',
	'PUT /deletegame':'ChessgameController.deletegame',
	'PUT /updatelevelbeaten':'PageController.UpdateLevelBeaten',
	'POST /newnotification':'NotificationController.newnotification',
	'GET /visitnotification':'NotificationController.visitnotification',
	//'PUT /ChangeUsersCurrentGame':'PageController.ChangeUsersCurrentGame',
	
	'POST /newwallpost':'WallpostController.wallpost',
	'PUT /LookedAtProfile':'PageController.LookedAtProfile',
	'PUT /chessgamemove':'ChessgameController.chessgamemove',
	'PUT /BroadcastPing':'PageController.BroadcastPing',
	'PUT /pingtest':'PageController.ReturnPing',
	'/logintwitter': 'AuthController.logintwitter',
	'/auth/google_oauth2':'AuthController.googlecallback',
	'/logingoogle': 'AuthController.logingoogle',
	'/auth/twitter_oauth':'AuthController.twittercallback',
  	'/loginfacebook': 'AuthController.loginfacebook',
	'/auth/facebook_oauth2':'AuthController.facebookcallback',
	'POST /register':'AuthController.register',
	'PUT /login':'AuthController.login'
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
