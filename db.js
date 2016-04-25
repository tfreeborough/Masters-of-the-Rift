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
	var $sessions = mongoose.model('Sessions', $sessionSchema);

	this.Sessions = $sessions;
    
	var $validateSession = function($token, $loginId) {
		var $Date = new Date;
		var $resp = null;
		$sessions.findOne({loginId: $loginId, sessionId: $token}, 'loginId sessionId Date', function(err, session) {
			if (err) {
				console.log('IMPORTANT MEGAERROR: ' + err);
			} else {
				console.log(session);
				if (typeof session === 'object') {
					if ((((new Date(session.time).getTime()) / 1000) + 2592000) < $Date.getTime() / 1000) {
						$resp = {err: true, msg: 'Session exceeds 30 day timeout.'};
					} else {
						$resp = {err: false, msg: 'Success!'};
					}
				} else {
					$resp = {err: true, msg: 'No session found.'};
				}
			}
		});
		if ($resp == null) {
			return {err: true, msg: 'POO'};
		} else {
			return $resp;
		}
		
	}
	this.validateSession = $validateSession;
}