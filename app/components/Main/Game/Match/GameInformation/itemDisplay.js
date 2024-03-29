/** @jsx React.DOM */


/**
 * class @ItemDisplay
 *
 * states
 *  - stats: The player stats (from parent)
 *  - timeline: The timeline object of what happened
 *
 *  desc    This component not only renders the items the player had, but provides a basic overview of their in game
 *          averages whilst in the game.
 */
var ItemDisplay = React.createClass({

    getInitialState: function(){
        return({
            stats:this.props.stats,
            timeline:this.props.timeline
        })
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            stats:nextProps.stats,
            timeline:nextProps.timeline
        })
    },

    workOutAverage: function(array){
        var sum = array.reduce(function(a, b) { return a + b; });
        var avg = sum / array.length;
        return avg;
    },

    render: function(){
        /**
         * First we need to look for items that the player had and display them, then we need to look at the timeline
         * data to build an average of what happened over the entire game, at the bottom of this component we
         * display the players average Creep Kills, Damage Taken, Gold Earned and XP Gained over the
         * course of the entire match
         */
        var rows = [];
        for (var i=0; i < 7; i++) {
            if(this.state.stats.hasOwnProperty('item'+i)){
                var propString = 'item'+i;
                var imgString = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/'+this.state.stats[propString]['image']['full'];
                if(i < 6) {
                    rows.push(
                        <div className="left center-align">
                            <div className="square no-select">
                                <img className="no-select" src={imgString}/>
                            </div>
                        </div>
                    );
                }else if(i == 6){
                    rows.push(
                        <div className="left center-align">
                            <div className="square no-select trinket">
                                <img className="no-select" src={imgString}/>
                            </div>
                        </div>
                    );
                }
            }
        }
        var csMin = Object.keys(this.state.timeline.creepsPerMinDeltas).map(function(i,item){
            return(this.state.timeline.creepsPerMinDeltas[i]);
        },this);
        csMin = this.workOutAverage(csMin);

        var dtMin = Object.keys(this.state.timeline.damageTakenPerMinDeltas).map(function(i,item){
            return(this.state.timeline.damageTakenPerMinDeltas[i])
        },this);
        dtMin = this.workOutAverage(dtMin);

        var goldMin = Object.keys(this.state.timeline.goldPerMinDeltas).map(function(i,item){
            return(this.state.timeline.goldPerMinDeltas[i])
        },this);
        goldMin = this.workOutAverage(goldMin);

        var xpMin = Object.keys(this.state.timeline.xpPerMinDeltas).map(function(i,item){
            return(this.state.timeline.xpPerMinDeltas[i])
        },this);
        xpMin = this.workOutAverage(xpMin);

        return(
            <div>
                {rows}
                <div className="stat-div">
                    <p className="flow-text stat-title">
                        Progression
                    </p>
                    <div className="stat-item col s12 flow-text">
                        <div className="stat-item-title">
                            <img className="icon" src="/assets/images/icons/cooldown-reduction.png" />
                            <span>CS/Min: <b><span className="cs-min">{csMin.toFixed(0)}</span></b></span>
                        </div>
                    </div>
                    <div className="stat-item col s12 flow-text">
                        <div className="stat-item-title">
                            <img className="icon" src="/assets/images/icons/cooldown-reduction.png" />
                            <span>DT/Min: <b><span className="cs-min">{dtMin.toFixed(0)}</span></b></span>
                        </div>
                    </div>
                    <div className="stat-item col s12 flow-text">
                        <div className="stat-item-title">
                            <img className="icon" src="/assets/images/icons/cooldown-reduction.png" />
                            <span>Gold/Min: <b><span className="cs-min">{goldMin.toFixed(0)}</span></b></span>
                        </div>
                    </div>
                    <div className="stat-item col s12 flow-text">
                        <div className="stat-item-title">
                            <img className="icon" src="/assets/images/icons/cooldown-reduction.png" />
                            <span>XP/Min: <b><span className="cs-min">{xpMin.toFixed(0)}</span></b></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

})