// db.js created by Salam
// Schema/Models for mongodb records

module.exports = function (mongoose) {

	$userSchema = new mongoose.Schema({

		loginId: String,
		summonerName: String,
		password: String,
		salt: String,
		region: String

	});
	$users = mongoose.model('User', $userSchema);

	this.Users = $users

    
	$sessionSchema = new mongoose.Schema({

		loginId: { type: [String], index: true },
		sessionId: String,
		time:{ type: Date, default: Date.now }

	});
	$sessions = mongoose.model('Sessions', $sessionSchema);

	this.Sessions = $sessions;
    
	this.validateSession = function ($token, $loginId) {
		var $session = null;
		var $Date = new Date;
		console.log($Date);
		this.Sessions.findOne({loginId: $loginId, sessionId: $token}, 'loginId sessionId Date', function (err, session) {
			if (err) {
				console.log('IMPORTANT MEGAERROR: ' + err);
			} else {
				$session = session;
				if ($session == null) {
					return {err: true, msg: 'No session found.'};
				} else {
					if ((((new Date($user.time).getTime()) / 1000) + 2592000) < $Date.getTime() / 1000) {
						return {err: true, msg: 'Session exceeds 30 day timeout.'};
					} else {
						return {err: false, msg: 'Success!'};
					}
				}
			}
		});

	}

}