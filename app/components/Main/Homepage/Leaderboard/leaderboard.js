/** @jsx React.DOM */


/**
 * class    @Leaderboard
 *
 * states
 *  - leaderboard: The leaderboard information that was received by the server
 *
 *  desc    The Leaderboard component gets the top players by total points and handles the displaying of that information
 *          inside of its child components, it also have some share functionality to players can share the game
 *          from the homepage.
 */
var Leaderboard = React.createClass({

    shareFacebook: function(){
        FB.ui(
            {
                method: 'share',
                href: 'https://developers.facebook.com/docs/'
            }, function(response){});
    },

    shareTwitter: function(){
        var url = 'https://twitter.com/intent/tweet?text=Play%20Masters%20of%20the%20Rift%20at%20http://dedivps-47985.dedicloud.co.uk/';
        var title = 'Share Masters of the Rift to Twitter!';
        var w = 600;
        var h = 400;

        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    },

    shareReddit: function(){
        var url = '//www.reddit.com/submit?url=' + encodeURIComponent(window.location) + '&title=Have%20you%20guys%20checked%20out%20Masters%20of%20the%20Rift%20yet?';
        var title = 'Share Masters of the Rift to Reddit!';
        var w = 600;
        var h = 400;

        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    },

    componentDidMount: function(){
        socket.emit('requestLeaderboardStats');

        socket.on('requestLeaderboardStatsEvent',this.leaderboardStatsEvent);
        socket.on('leaderboardStatsEvent',this.leaderboardStatsEvent);
    },

    componentWillUnmount: function(){
        socket.removeListener('requestLeaderboardStatsEvent',this.leaderboardStatsEvent);
        socket.removeListener('leaderboardStatsEvent',this.leaderboardStatsEvent);
    },

    leaderboardStatsEvent: function(data){
        this.setState({
            leaderboard:data.leaders
        })
    },

    getInitialState:function(){
        return({
            leaderboard:[]
        })
    },

    render: function(){
        /**
         * Render either LeaderboardDisplay if there are stats that are received from the server, we also wanted to
         * render a few sharing buttons below as well to encourage users to share the webpage via social media.
         */
        return(
            <div className="col s5">
                <div id="leaderboard">
                    <h4 className="center-align">
                        <span className="motr-pink">Live</span>
                        <span className="motr-blue">Leaderboards</span>
                    </h4>
                    <div className="col s12">
                        {(
                            this.state.leaderboard.length > 0
                            ?
                                <LeaderboardDisplay leaderboard={this.state.leaderboard} />
                            :
                                <p className="flow-text">Pinging Server for stats...</p>
                        )}
                    </div>
                </div>
                <div className="col s12">
                    <p className="center-align flow-text motr-pink share-title">Share the game!</p>
                    <div className="col s6">
                        <button className="col s12 share twitter-share-button waves-effect waves-light btn-large light-blue twitter-share" onClick={this.shareTwitter}>
                            Twitter
                        </button>
                    </div>
                    <div className="col s6">
                        <button className="col s12 share waves-effect waves-light btn-large orange darken-3 reddit-share" onClick={this.shareReddit}>
                            Reddit
                        </button>
                    </div>
                </div>



            </div>
        )
    }
})