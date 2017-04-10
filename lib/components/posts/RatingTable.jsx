import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Components, Utils, getActions, registerComponent} from 'meteor/vulcan:core';
import {FormattedMessage} from 'react-intl'
import ReactTable from 'react-table'
import {PMSRatingTable} from './PMSRatingTable'
import _ from 'lodash'

const RatingTable = (props) => {
	const {queryId, playerRating} = props

	let map = topRatingDataMap(props);
	return (
		<ReactTable
			//className="rt-ratingTable"
			columns={topRatingColumnMap}
			data={map}
			// pivotBy={['name']}
			defaultPageSize={10}
			SubComponent={ (row) => {
				return <span><PMSRatingTable {...props} row={row}/></span>
			}
			}
		/>
	)
}

const topRatingDataMap = (props) => {
	const {queryId, detailedRatingQuery, playerRating, playerMatchStats, playerStats } = props

	let map = []
	const query = detailedRatingQuery[queryId]
	const playerArr = query.playerRatings

	for (let id in playerArr) {                   // For each id in ratingQuery's rating list
		let player = playerRating[playerArr[id]]    // Get the actual player rating from the list
		let data = {
			number: parseInt(id)+1,
			team: "",
			name: playerStats[player.playerId].displayName,
			rating: player.rating,
			raw: 0,
			T: 0,
			TA: 0,
			PTS: 0,
			K: 0,
			P: 0,
			R: 0,
			MR: 0,
			CB: 0,
			DB: 0,
			O: 0,
			TC: 0,
			TM: 0,
			MT: 0,
			LW: 0,
			PC: 0,
			YC: 0,
			RC: 0,
			time: 0,
		}

		for (let i = 0; i < player.matchStats.length; i++) {        // For each match pertaining to player's rating
			let matchStat = playerMatchStats[player.matchStats[i]]    // Get stats for match
			let ratingComponent = player.ratingComponents[i]          // Also get rating component pertaining to match from player

			// data.name += ratingComponent.matchLabel;
			// data.rating += ratingComponent.scaledRating
			data.team = matchStat.teamAbbr,
			data.raw += ratingComponent.rawScore
			data.T += matchStat.tries
			data.TA += matchStat.tryAssists
			data.PTS += matchStat.points
			data.K += matchStat.kicks
			data.P += matchStat.passes
			data.R += matchStat.runs
			data.MR += matchStat.metersRun
			data.CB += matchStat.cleanBreaks
			data.DB += matchStat.defendersBeaten
			data.O += matchStat.offloads
			data.TC += matchStat.turnovers
			data.TM += matchStat.tacklesMade
			data.MT += matchStat.tacklesMissed
			data.LW += matchStat.lineoutsWonOnThrow
			data.PC += matchStat.penaltiesConceded
			data.YC += matchStat.yellowCards
			data.RC += matchStat.redCards
			data.time += matchStat.timePlayed

			if(i == player.matchStats.length-1) {
				data.time = data.time / player.matchStats.length    // Get average of time played.
				data.raw = data.raw.toFixed(2)
			}
		}

		map.push(data)
	}
	return map
}
const topRatingColumnMap = [
	{
		header: "No.",
		accessor: "number",
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
	},
	{
		header: "Team",
		accessor: "team",
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		render: row => {
			return <span><img src={Utils.getLogoFromAbbr(row.value)} title={row.value} /></span>
		}
	},
	{
		header: "Name",
		accessor: "name",
		minWidth: undefined,
		className: 'td-larger',
		headerClassName: 'th-larger',
	},
	{
		header: "Rating",
		accessor: 'rating',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
	},
	{
		header: "Raw",
		accessor: 'raw',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "T",
		accessor: 'T',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "TA",
		accessor: 'TA',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "PTS",
		accessor: 'PTS',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "K",
		accessor: 'K',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "P",
		accessor: 'P',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "R",
		accessor: 'R',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "MR",
		accessor: 'MR',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "CB",
		accessor: 'CB',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "DB",
		accessor: 'DB',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "O",
		accessor: 'O',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "TC",
		accessor: 'TC',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "TM",
		accessor: 'TM',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "MT",
		accessor: 'MT',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "LW",
		accessor: 'LW',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "PC",
		accessor: 'PC',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "YC",
		accessor: 'YC',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "RC",
		accessor: 'RC',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	},
	{
		header: "Time",
		accessor: 'time',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
		// aggregate: vals => _.sum(vals),
		// render: row => {
		// 	return <span>{row.aggregated ? row.value : row.value}</span>
		// }
	}
]

const mapStateToProps = ({entities: {detailedRatingQuery, playerRating, playerMatchStats, playerStats}}) => ({
	detailedRatingQuery,
	playerRating,
	playerMatchStats,
	playerStats
});
const {loadTeamMatchStats, loadPlayerMatchStats} = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({loadTeamMatchStats, loadPlayerMatchStats}, dispatch);

registerComponent('RatingTable', RatingTable, connect(mapStateToProps, mapDispatchToProps));
