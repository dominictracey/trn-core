import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl'
import _ from 'lodash'
import { Grid, Col, Row, Button, ButtonGroup } from 'react-bootstrap'
import Griddle from 'griddle-react'

const teamStatAbbrMap = {
	teamAbbr: "Team",
	tries: "Tries",
	conversions: "CV",
	//conversionsMade: "CM",
	penalties: "PT",
	//penaltiesMade: "PM",
	dropGoals: "DG",
	//dropGoalsMade: "DGM",
	kicksFromHand: "K",
	passes: "P",
	runs: "C",
	//metersRun: "MR",
	possesion: "Poss",
	territory: "Terr",
	cleanBreaks: "CB",
	defendersBeaten: "DB",
	offloads: "OL",
	rucks: "R",
	//rucksWon: "RW",
	mauls: "M",
	//maulsWon: "MW",
	turnoversConceded: "TOC",
	tackles: "T",
	//tacklesMissed: "TM",
	scrums: "S",
	//scrumsWonOnOwnPut: "SW",
	lineouts: "LO",
	//lineoutsWonOnOwnThrow: "LOW",
	penaltiesConceded: "PC",
	yellowCards: "YC",
	redCards: "RC",
}
const playerMap = {
	teamAbbr: "Team",
	name:"Name",
	position:"Position",
	tries:"T",
	tryAssists:"TA",
	points:"PTS",
	kicks:"K",
	passes:"P",
	runs:"R",
	metersRun:"MR",
	cleanBreaks:"CB",
	defendersBeaten:"DB",
	offloads:"O",
	turnovers:"TC",
	tacklesMade:"TM",
	tacklesMissed:"MT",
	lineoutsWonOnThrow:"LW",
	penaltiesConceded:"PC",
	yellowCards:"YC",
	redCards:"RC",
	timePlayed:"Time"
}

class PostsMatchBody extends Component {

  constructor() {
    super();
    this.showStats = this.showStats.bind(this);
		
		// always define an inital state!
		this.state = {
			loadingMatch: false,
			loadingPlayer: false,
			loadingTt: false,
      showTeamStats: -1,
      showPlayerStats: -1
		};
  }

  async componentDidMount() {
    const {loadMatch, post} = this.props;
    await loadMatch([post.trnId]);
  }

  async showStats(index) {
    const { post, matches={}, loadTeamMatchStats, loadPlayerMatchStats, flash } = this.props

      //const index = 0 // @xavier: where do you make it change?

    try {
      if (index === 0) {      // Fetch Team Stats
        console.log('fetch match start');
        this.setState({
        	loadingMatch: true,
	        showPlayerStats: -1,

        });

        await loadTeamMatchStats(post.trnId, matches[post.trnId].homeTeamId)


        console.log('fetch end');
        this.setState({
        	loadingMatch: false,
	        showTeamStats: 0,
        });


      } else if (index === 1) {     // Fetch Player stats
	      this.setState({
	      	loadingPlayer: true,
		      showTeamStats: -1,

	      });
        console.log("fetch players start")

        await loadPlayerMatchStats(post.trnId, matches[post.trnId].homeTeamId)

        console.log("fetch end")
	      this.setState({
	        loadingPlayer: false,
		      showPlayerStats: 0,
	      });


      } else if (index === 2) {
      	flash(`Top Ten not implemented, yet.`, 'success');
        //await loadPlayerMatchStats(post.trnId, matches[post.trnId].visitingTeamId)
      }
    } catch(e) {
      flash(`Error fetching comp: ${e}`, "error");
    }
  }

  prepareTeamMatchStats(tmsList) {
    const { teamMatchStats={} } = this.props

    var retval = []
    tmsList.map(function(tmsId) {
      const tms = teamMatchStats[tmsId]
      var tmsComb = {
      	teamAbbr: tms.teamAbbr,
        tries: tms.tries,
        conversions: tms.conversionsMade +"/"+ tms.conversionsAttempted,
        penalties: tms.penaltiesMade +"/"+ tms.penaltiesAttempted,
        dropGoals: tms.dropGoalsMade +"/"+ tms.dropGoalsAttempted,
        kicksFromHand: tms.kicksFromHand,
        passes: tms.passes,
        runs: tms.runs +"/"+ tms.metersRun,
        possesion: tms.possesion,
        territory: tms.territory,
        cleanBreaks: tms.cleanBreaks,
        defendersBeaten: tms.defendersBeaten,
        offloads: tms.offloads,
        rucks: tms.rucksWon +"/"+ tms.rucks,
				mauls: tms.maulsWon +"/"+ tms.mauls,
				turnoversConceded: tms.turnoversConceded,
        tackles: tms.tacklesMade +"/"+ tms.tacklesMissed,
        scrums: tms.scrumsWonOnOwnPut +"/"+ tms.scrumsPutIn,
        lineouts: tms.lineoutsWonOnOwnThrow +"/"+ tms.lineoutsThrownIn,
        penaltiesConceded: tms.penaltiesConceded,
        yellowCards: tms.yellowCards,
        redCards: tms.redCards,
      }

      var cleansed = {}
      Object.keys(teamStatAbbrMap).map(function(key) {
        cleansed[teamStatAbbrMap[key]] = tmsComb[key]
      })
      retval.push(cleansed)
    })

    return retval
  }

	preparePlayerStats(playerList) {
		const { playerStats={} } = this.props

		var retval = []
		playerList.map(function(playerId) {
		  const pms = playerStats[playerId]

			var cleansed = {}
			Object.keys(playerMap).map(function(key) {
			  cleansed[playerMap[key]] = pms[key]
			})
			retval.push(cleansed)
		})

		return retval
	}

  render() {
    const { post, matches={}, teams={}, simpleScoreMatchResults={}, teamMatchStatsByMatchId={}, teamMatchStats={}, playerStats={}, playerMatchStats={} } = this.props

    const match = matches[post.trnId]

    if (!match) {
      const Loading = Components.Loading;
      return ( <Loading/> )
    }
    var status = 'waiting'
    var homeAbbr = 'NON'
    var visitAbbr = 'NON'
    var homeName = ''
    var visitName = ''
    var venue = {}
    var venueCity = null
    var venueName = null
    var score = ' vs. '
    var date = ''
    var teamStats = null
    var teamStatsGrid = null
    var locPlayerStats = null
    var legend = null

    if (match && match.status) {
      status = match.status
      homeAbbr = teams[match.homeTeamId].abbr + ' teamlogo-med homeLogo'
      visitAbbr = teams[match.visitingTeam].abbr + ' teamlogo-med visitLogo'
      homeName = teams[match.homeTeamId].displayName
      visitName = teams[match.visitingTeam].displayName
      if(match.venue){
        venue = match.venue
        venueCity = venue.venueCity != null ? venue.venueCity : null
	      venueName = venue.venueName != null ? venue.venueName : null
      }
      date = new Date(match.date)
      if (_.includes(status,'FINAL') && match.simpleScoreMatchResultId) {
        const result = simpleScoreMatchResults[match.simpleScoreMatchResultId]
        score = ' ' + result.homeScore + ' - ' + result.visitScore + ' '
        status = 'Final'
      }

      teamStats = this.state.showTeamStats != -1 && teamMatchStatsByMatchId && teamMatchStatsByMatchId[post.trnId] && teamMatchStats[teamMatchStatsByMatchId[post.trnId].tmsList[this.state.showTeamStats]] ? this.prepareTeamMatchStats(teamMatchStatsByMatchId[post.trnId].tmsList) : null
      locPlayerStats = this.state.showPlayerStats != -1 && playerMatchStats && playerMatchStats[post.trnId]        && playerMatchStats[post.trnId].players ? this.preparePlayerStats(playerMatchStats[post.trnId].players) : null

      if(teamStats && this.state.showTeamStats != -1){
      	locPlayerStats = null
	      teamStatsGrid = (<Griddle columns={Object.values(teamStatAbbrMap)} showFilter={true} showSettings={true} results={teamStats} />)
      }
      else if(locPlayerStats && this.state.showPlayerStats != -1){
      	teamStats = null

	      teamStatsGrid = (<Griddle columns={Object.values(playerMap)} showFilter={true} showSettings={true} results={locPlayerStats} resultsPerPage={50}
	      useFixedHeader={true} />)
        //teamStatsGrid = locPlayerStats[0].toString()
      }
      else{
	      teamStatsGrid = null
      }

      if(teamStatsGrid && this.state.showTeamStats != -1){
	      legend = (<FormattedMessage id="teamMatchStats.legend"/>)
      }
      else if(teamStatsGrid && this.state.showPlayerStats != -1){
	      legend = (<FormattedMessage id="playerMatchStats.legend"/>)
      }
      else{
      	legend = null
      }

    }

    return (
      <div>
        <Grid><Row><Col md={4}>
          <div className={homeAbbr}></div><div className='matchTeamName matchTeamName-home'>{homeName}</div>
        </Col><Col md={4}>
          <div className='matchScore'>{score}</div>
        </Col><Col md={4}><div className='matchTeamName matchTeamName-visit'>{visitName}</div><div className={visitAbbr}></div>
        </Col></Row><Row><Col md={12}>
          <div className='matchStatus'>{status}</div>
          <div className="matchVenue">{venueName}<br/>{venueCity}</div>
          <div className='matchDate'><FormattedDate value={date}/> <FormattedTime value={date}/></div>
        </Col></Row><Row><Col>
          <div className='teamStatsPanel'>{teamStatsGrid}</div>
          <div className='teamStatsLegend'>{legend}</div>
        </Col></Row></Grid>
        <ButtonGroup justified>
          <Button bsStyle="info" bsSize="small" onClick={() => this.showStats(0)}>{this.state.loadingMatch ? <Components.Loading /> : <span>Team Stats</span>}</Button>
          <Button bsStyle="info" bsSize="small" onClick={() => this.showStats(1)}>{this.state.loadingPlayer ? <Components.Loading /> : <span>Player Stats</span>} </Button>
          <Button bsStyle="info" bsSize="small" onClick={() => this.showStats(2)}>{this.state.loadingTt ? <Components.Loading /> : <span>Top Ten Performances</span>}</Button>
        </ButtonGroup>
      </div>
    )
  }
}

PostsMatchBody.propTypes = {
  matches: React.PropTypes.object,
  post: React.PropTypes.object,
  flash: React.PropTypes.func,
}

// const mapStateToProps = state => {
//   const { entities } = state
//   const { matches, teams, simpleScoreMatchResults, teamMatchStatsByMatchId, teamMatchStats } = entities
// 
//   return {
//     matches,
//     teams,
//     simpleScoreMatchResults,
//     teamMatchStatsByMatchId,
//     teamMatchStats,
//   }
// }

// note: same thing as above
const mapStateToProps = ({entities: { matches, teams, simpleScoreMatchResults, teamMatchStatsByMatchId, teamMatchStats, playerMatchStats, playerStats } }) => ({ matches, teams, simpleScoreMatchResults, teamMatchStatsByMatchId, teamMatchStats, playerMatchStats, playerStats });

// note: destructure Actions for more readibility
const { loadMatch, loadTeamMatchStats, loadPlayerMatchStats } = Actions;

const mapDispatchToProps = dispatch => bindActionCreators({ loadMatch, loadTeamMatchStats, loadPlayerMatchStats }, dispatch);

registerComponent('PostsMatchBody', PostsMatchBody, withMessages, connect(mapStateToProps, mapDispatchToProps));
