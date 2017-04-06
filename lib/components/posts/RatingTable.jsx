import React, {Component, PropTypes} from 'react'
import Components from 'meteor/vulcan:core'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Utils, getActions, registerComponent} from 'meteor/vulcan:core';
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
			pivotBy={['name']}
			defaultPageSize={10}
			SubComponent={ (row) => {
				return <span><PMSRatingTable {...props} row={row}/></span>
			}
			}
		/>
	)
}

const topRatingDataMap = (props) => {
	const {queryId, detailedRatingQuery, playerRating, playerMatchStats} = props

	let map = []
	const query = detailedRatingQuery[queryId]
	const playerArr = query.playerRatings

	for (let id in playerArr) {
		let player = playerRating[playerArr[id]]
		let data = {
			name: player.playerId,
			rating: player.rating,
			rawScore: 0,
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

		for (let i = 0; i < player.matchStats.length; i++) {
			let matchStat = playerMatchStats[player.matchStats[i]]
			let ratingComponent = player.ratingComponents[i]

			// data.name += ratingComponent.matchLabel;
			// data.rating += ratingComponent.scaledRating
			data.rawScore += ratingComponent.rawScore
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

		}

		map.push(data)
	}
	return map
}
const topRatingColumnMap = [

	{
		header: "Name",
		accessor: "name",
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
	},
	{
		header: "Rating",
		accessor: 'rating',
		minWidth: undefined,
		className: 'td-smaller',
		headerClassName: 'th-smaller',
	},
	{
		header: "RawScore",
		accessor: 'rawScore',
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
