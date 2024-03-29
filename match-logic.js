

 module.exports = function($id, $p1, $p2, $apiHandler) {

 	this.id = $id;
 	this.players = [$p1, $p2];


     /*
     fetchGameDetails runs all the code needed to create a match with the givenId,
     this is a very important function that probably should not be changed. AT ALL!
      */
 	this.fetchGameDetails = function($gameId,callback) {

 		/*
 		* class @fetchGameDetails
 		*
 		*	@param $gameId - the id number of the game to fetch from the riot servers
 		*	@param callback - a callback function for the response
 		*
 		*	desc - Takes a game id and requests the game data from the riot api match v2.2
 		*	Returns an object containing all needed game data from multiple api calls as well as mastery data for all participants
 		*/

		var $match = $apiHandler.getMatch($gameId,null, null, function($match) {
			callback($match);
		});

 	};

 }
