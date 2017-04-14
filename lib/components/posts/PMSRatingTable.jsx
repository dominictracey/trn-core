import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Components, Utils, getActions, registerComponent } from 'meteor/vulcan:core';
import ReactTable from 'react-table'
import _ from 'lodash'

export const PMSRatingTable = (props) => {
	const { queryId, playerRating } = props

	let map = playerRating ? dataMap(props) : null
	return (

		map
			? <ReactTable
			className="-sub"
			columns={columnMap}
			data={map}
			defaultPageSize={map.length}
			showPagination={false}
		/>
			: null
	)
}

const columnMap = [
	{
		header: "Comp",
		accessor: "comp",
		minWidth: undefined,
		className: 'td-placer',
		headerClassName: 'th-placer',
	},
	{
		header: "Round",
		accessor: "round",
		minWidth: undefined,
		className: 'td-placer',
		headerClassName: 'th-placer',
	},
	{
		header: "Match",
		accessor: "match",
		minWidth: undefined,
		className: 'td-larger',
		headerClassName: 'th-larger',
		render: row => {
			return <span><Components.MatchLabel {...this.props} label={row.value} /></span>
		},
	},
	{
		header: "Rating",
		accessor: 'rating',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "Raw",
		accessor: 'raw',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "T",
		accessor: 'T',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "TA",
		accessor: 'TA',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "PTS",
		accessor: 'PTS',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "K",
		accessor: 'K',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "P",
		accessor: 'P',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "R",
		accessor: 'R',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "MR",
		accessor: 'MR',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "CB",
		accessor: 'CB',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "DB",
		accessor: 'DB',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "O",
		accessor: 'O',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "TC",
		accessor: 'TC',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "TM",
		accessor: 'TM',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "MT",
		accessor: 'MT',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "LW",
		accessor: 'LW',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "PC",
		accessor: 'PC',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "YC",
		accessor: 'YC',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "RC",
		accessor: 'RC',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	},
	{
		header: "Time",
		accessor: 'time',
		minWidth: undefined,
		className: 'td-smaller sub',
		headerClassName: 'th-smaller',
	}
]

const dataMap = (props) => {
	const {row, queryId, detailedRatingQuery, playerMatchStats, playerRating} = props

	let map = []
	let data = {}
	const query = detailedRatingQuery ? detailedRatingQuery[queryId] : null
	const playerArr = query.playerRatings

	let key = Object.keys(playerRating)[row.index]
	let player = playerRating[key]
	for (let i = 0; i < player.matchStats.length; i++) {
		let matchStat = playerMatchStats[player.matchStats[i]]
		let ratingComponent = player.ratingComponents[i]
		let pieces = ratingComponent.matchLabel.split(" ")[5].split("-")
		data = {
			comp: pieces[0].substring(1),
			round: pieces[1].substring(0, pieces[1].length-1),
			match: ratingComponent.matchLabel,
			rating: ratingComponent.scaledRating,
			raw: ratingComponent.rawScore.toFixed(2),
			T: matchStat.tries,
			TA: matchStat.tryAssists,
			PTS: matchStat.points,
			K: matchStat.kicks,
			P: matchStat.passes,
			R: matchStat.runs,
			MR: matchStat.metersRun,
			CB: matchStat.cleanBreaks,
			DB: matchStat.defendersBeaten,
			O: matchStat.offloads,
			TC: matchStat.turnovers,
			TM: matchStat.tacklesMade,
			MT: matchStat.tacklesMissed,
			LW: matchStat.lineoutsWonOnThrow,
			PC: matchStat.penaltiesConceded,
			YC: matchStat.yellowCards,
			RC: matchStat.redCards,
			time: matchStat.timePlayed,
		}

		map.push(data)
	}
	return map
}


const mapStateToProps = ({entities: {detailedRatingQuery, playerRating, playerMatchStats, playerStats}}) => ({
	detailedRatingQuery,
	playerRating,
	playerMatchStats,
	playerStats
});
const {loadTeamMatchStats, loadPlayerMatchStats} = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({loadTeamMatchStats, loadPlayerMatchStats}, dispatch);

registerComponent('PMSRatingTable', PMSRatingTable, connect(mapStateToProps, mapDispatchToProps));
