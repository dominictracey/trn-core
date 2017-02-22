import React, { Component, PropTypes } from 'react'
import Components from 'meteor/nova:core'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActions, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl'
import ReactTable from 'react-table'

const teamStatAbbrMap = {
  teamAbbr: "Team",
  tries: "Tries",
  conversions: "CV",
  penalties: "PT",
  dropGoals: "DG",
  kicksFromHand: "K",
  passes: "P",
  runs: "C",
  possesion: "Poss",
  territory: "Terr",
  cleanBreaks: "CB",
  defendersBeaten: "DB",
  offloads: "OL",
  rucks: "R",
  mauls: "M",
  turnoversConceded: "TOC",
  tackles: "T",
  scrums: "S",
  lineouts: "LO",
  penaltiesConceded: "PC",
  yellowCards: "YC",
  redCards: "RC",
}
const playerMap = {
  teamAbbr: "Team",
  name:"Name",
  position:"Position",
  tries: "T",
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
let playerStatMeta = []
let teamStatsMeta = []

class MatchStats extends Component {

  constructor(props) {
    super();
    this.preparePlayerStats = this.preparePlayerStats.bind(this)
    this.prepareTeamMatchStats = this.prepareTeamMatchStats.bind(this)

    const { trnId, match, type, loadPlayerMatchStats, loadTeamMatchStats } = props
    if(type){
      if(type == "players"){
        loadPlayerMatchStats(trnId, match.homeTeamId)
      }
      else if(type == "teams"){
        loadTeamMatchStats(trnId, match.homeTeamId)
      }
    }
  }

  componentWillReceiveProps(next) {
    const { type, trnId, match, loadPlayerMatchStats, loadTeamMatchStats } = this.props;

    if(type != next.type){
	    if(next.type == "players"){
		    loadPlayerMatchStats(trnId, match.homeTeamId)
	    }
	    else if(next.type == "teams"){
		    loadTeamMatchStats(trnId, match.homeTeamId)
	    }
    }
  }

	prepareTeamMatchStats(tmsList) {
		const { teamMatchStats={} } = this.props

		let retval = []
		let tmsComb = {}
		tmsList.map(function(tmsId) {
			const tms = teamMatchStats[tmsId]
			tmsComb = {
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

			let cleansed = {}
			Object.keys(teamStatAbbrMap).map(function(key) {
				cleansed[teamStatAbbrMap[key]] = tmsComb[key]
			})
			retval.push(cleansed)
		})

		teamStatsMeta = []
		Object.keys(teamStatAbbrMap).map((key) => {
			if(key == "runs" || key == "name"){
				teamStatsMeta.push({
					accessor: teamStatAbbrMap[key],
					header: props => <span data-toggle="tooltip" data-placement="top" title={key}>{teamStatAbbrMap[key]}</span>,
					sortable: true,
					minWidth: 80,
				})
			}
			else{
				teamStatsMeta.push({
					accessor: teamStatAbbrMap[key],
					header: props => <span data-toggle="tooltip" title={key}>{teamStatAbbrMap[key]}</span>,
					sortable: true,
					minWidth: 60,
				})
			}
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

		playerStatMeta = []
		Object.keys(playerMap).map((key) => {
			if(key == "position" || key == "name"){
				playerStatMeta.push({
					accessor: playerMap[key],
					header: props => <span data-toggle="tooltip" data-placement="top" title={key} >{playerMap[key]}</span>,
					sortable: true,
					minWidth: undefined,
					className: 'td-larger',
					headerClassName: 'th-larger',
				})
			}
			else{
				playerStatMeta.push({
					accessor: playerMap[key],
					header: props => <span data-toggle="tooltip" title={key} >{playerMap[key]}</span>,
					sortable: true,
					minWidth: undefined,
					className: 'td-smaller',
					headerClassName: 'th-smaller',
				})
			}
		})

		return retval
	}


	render() {
		const { type, trnId, teamMatchStatsByMatchId={}, teamMatchStats={}, playerMatchStats={} } = this.props

		let teamStats = null
		let teamStatsGrid = null
		let locPlayerStats = null
		let legend = null

		teamStats = type == "teams" && teamMatchStatsByMatchId && teamMatchStatsByMatchId[trnId] && teamMatchStats[teamMatchStatsByMatchId[trnId].tmsList[0]] ? this.prepareTeamMatchStats(teamMatchStatsByMatchId[trnId].tmsList) : null
		locPlayerStats = type == "players" && playerMatchStats && playerMatchStats[trnId]        && playerMatchStats[trnId].players                           ? this.preparePlayerStats(playerMatchStats[trnId].players)           : null

		if(teamStats && type == "teams"){
			locPlayerStats = null
			teamStatsGrid = (<ReactTable columns={teamStatsMeta} data={teamStats} defaultPageSize={teamStats.length} noDataText={''}  />)
		}
		else if(locPlayerStats && type == "players"){
			teamStats = null
			teamStatsGrid = (<ReactTable columns={playerStatMeta} data={locPlayerStats} defaultPageSize={locPlayerStats.length} noDataText={''}  />)
		}
		else{
			teamStatsGrid = null
		}

		if(teamStatsGrid){
			legend = (<FormattedMessage id="teamMatchStats.legend"/>)
		}
		else if(teamStatsGrid){
			legend = (<FormattedMessage id="playerMatchStats.legend"/>)
		}
		else{
			legend = null
		}

		return (
      <div>
        {teamStatsGrid ? <div className='teamStatsPanel'>{teamStatsGrid}</div> : <Components.Loading />}
        {legend ? <div className='teamStatsLegend'>{legend}</div> : null}
      </div>
    )
  }
}

const mapStateToProps = ({entities: { teamMatchStatsByMatchId, teamMatchStats, playerMatchStats, playerStats } }) => ({ teamMatchStatsByMatchId, teamMatchStats, playerMatchStats, playerStats });
const { loadTeamMatchStats, loadPlayerMatchStats } = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({ loadTeamMatchStats, loadPlayerMatchStats }, dispatch);

MatchStats.displayName = "MatchStats"
registerComponent('MatchStats', MatchStats, connect(mapStateToProps, mapDispatchToProps));
