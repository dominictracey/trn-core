import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl'
import _ from 'lodash'
import { Grid, Col, Row, Button, ButtonGroup } from 'react-bootstrap'
import Griddle from 'griddle-react'

// const teamStatAbbrMap = {
//   teamAbbr: "Team",
//   tries: "Tries",
//   conversionsAttempted: "CA",
//   conversionsMade: "CM",
//   penaltiesAttempted: "PA",
//   penaltiesMade: "PM",
//   dropGoalsAttempted: "DGA",
//   dropGoalsMade: "DGM",
//   kicksFromHand: "K",
//   passes: "P",
//   runs: "C",
//   metersRun: "MR",
//   possesion: "Poss",
//   territory: "Terr",
//   cleanBreaks: "CB",
//   defendersBeaten: "DB",
//   offloads: "OL",
//   rucks: "R",
//   rucksWon: "RW",
//   mauls: "M",
//   maulsWon: "MW",
//   turnoversConceded: "TOC",
//   tacklesMade: "T",
//   tacklesMissed: "TM",
//   scrumsPutIn: "S",
//   scrumsWonOnOwnPut: "SW",
//   lineoutsThrownIn: "LO",
//   lineoutsWonOnOwnThrow: "LOW",
//   penaltiesConceded: "PC",
//   yellowCards: "YC",
//   redCards: "RC",
// }

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
const displayName = Object.getOwnPropertyNames(teamStatAbbrMap);

class PostsMatchBody extends Component {

  constructor() {
    super();
    this.showStats = this.showStats.bind(this);
  }

  componentDidMount() {
    const {loadMatch, post} = this.props
    loadMatch([post.trnId]);
    this.setState({
      loading: false,
      showTeamStats: -1,
      showPlayerStats: -1
    });
  }

  async showStats() {
    const { post, matches={}, loadTeamMatchStats, loadPlayerMatchStats, flash } = this.props

      const index = 0

    try {
      if (index === 0) {
        console.log('fetch start');
        this.setState({loading: true});

        await loadTeamMatchStats(post.trnId, matches[post.trnId].homeTeamId)


        console.log('fetch end');
        this.setState({loading: false});
        //flash(`Team Match Stats for "${matches[post.trnId].displayName}" fetched!`, 'success');
        this.setState({
          showTeamStats: 0,
          showPlayerStats: -1,
        })


      } else if (index === 1) {
        loadPlayerMatchStats(post.trnId, matches[post.trnId].homeTeamId)
      } else if (index === 2) {
        loadPlayerMatchStats(post.trnId, matches[post.trnId].visitingTeamId)
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


  render() {
    const { post, matches={}, teams={}, simpleScoreMatchResults={}, teamMatchStatsByMatchId={}, teamMatchStats={} } = this.props

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
    var score = ' vs. '
    var date = ''
    var teamStats = null
    var teamStatsGrid = null
    var legend = null

    if (match && match.status) {
      status = match.status
      homeAbbr = teams[match.homeTeamId].abbr + ' teamlogo-med homeLogo'
      visitAbbr = teams[match.visitingTeam].abbr + ' teamlogo-med visitLogo'
      homeName = teams[match.homeTeamId].displayName
      visitName = teams[match.visitingTeam].displayName
      date = new Date(match.date)
      if (_.includes(status,'FINAL') && match.simpleScoreMatchResultId) {
        const result = simpleScoreMatchResults[match.simpleScoreMatchResultId]
        score = ' ' + result.homeScore + ' - ' + result.visitScore + ' '
        status = 'Final'
      }

      teamStats = this.state.showTeamStats != -1 && teamMatchStatsByMatchId && teamMatchStatsByMatchId[post.trnId] && teamMatchStats[teamMatchStatsByMatchId[post.trnId].tmsList[this.state.showTeamStats]] ? this.prepareTeamMatchStats(teamMatchStatsByMatchId[post.trnId].tmsList) : null

      teamStatsGrid = teamStats ? (<Griddle columns={Object.values(teamStatAbbrMap)} columnMetadata={displayName} showFilter={true} showSettings={true} results={teamStats}/>) : null
      legend = teamStatsGrid != null ? (<FormattedMessage id="teamMatchStats.legend"/>) : null
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
          /* TODO Match venue */
          <div className='matchDate'><FormattedDate value={date}/> <FormattedTime value={date}/></div>
        </Col></Row><Row><Col>
          <div className='teamStatsPanel'>{teamStatsGrid}</div>
          <div className='teamStatsLegend'>{legend}</div>
        </Col></Row></Grid>
        <ButtonGroup justified>
          <Button bsStyle="info" bsSize="small" onClick={this.showStats}>{this.state.loading ? <Components.Loading /> : <span>Team Stats</span>}</Button>
          <Button bsStyle="info" bsSize="small">{homeName} Player Stats</Button>
          <Button bsStyle="info" bsSize="small">{visitName} Player Stats</Button>
          <Button bsStyle="info" bsSize="small">Top Ten Performances</Button>
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

const mapStateToProps = state => {
  const { entities } = state
  const { matches, teams, simpleScoreMatchResults, teamMatchStatsByMatchId, teamMatchStats } = entities

  return {
    matches,
    teams,
    simpleScoreMatchResults,
    teamMatchStatsByMatchId,
    teamMatchStats,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({loadMatch: Actions.loadMatch, loadTeamMatchStats: Actions.loadTeamMatchStats, loadPlayerMatchStats: Actions.loadPlayerMatchStats}, dispatch);

registerComponent('PostsMatchBody', PostsMatchBody, withMessages, connect(mapStateToProps, mapDispatchToProps));
