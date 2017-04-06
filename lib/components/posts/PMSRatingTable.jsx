import React, {Component, PropTypes} from 'react'
import Components from 'meteor/vulcan:core'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Utils, getActions, registerComponent} from 'meteor/vulcan:core';
import {FormattedMessage} from 'react-intl'
import ReactTable from 'react-table'
import _ from 'lodash'

export const PMSRatingTable = (props) => {
	const {queryId, row, playerRating} = props

	let map = playerRating ? dataMap(props) : null
	return (

		map
			? <ReactTable
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
		header: "Info",
		accessor: 'info',
		columns:
		[
			{
				header: "Name",
				accessor: "name",
			},
			{
				header: "Rating",
				accessor: 'rating',
			},
			{
				header: "RawScore",
				accessor: 'rawScore',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			}
		]
	},
	{
		header: "Stats",
		accessor: "stats",
		columns:
		[
			{
				header: "T",
				accessor: 'T',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "TA",
				accessor: "TA",
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "PTS",
				accessor: "PTS",
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "K",
				accessor: 'K',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "P",
				accessor: 'P',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "R",
				accessor: 'R',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "MR",
				accessor: 'MR',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "CB",
				accessor: 'CB',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "DB",
				accessor: 'DB',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "O",
				accessor: 'O',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "TC",
				accessor: 'TC',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "TM",
				accessor: 'TM',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "MT",
				accessor: 'MT',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "LW",
				accessor: 'LW',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "PC",
				accessor: 'PC',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "YC",
				accessor: 'YC',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "RC",
				accessor: 'RC',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			},
			{
				header: "Time",
				accessor: 'time',
				aggregate: vals => _.sum(vals),
				render: row => {
					return <span>{row.aggregated ? row.value : row.value}</span>
				}
			}
		]
	}
]

const dataMap = (props) => {
	const { row, queryId, detailedRatingQuery, playerMatchStats, playerRating} = props

	let map = []
	let data = {}
	const query = detailedRatingQuery ? detailedRatingQuery[queryId] : null
	const playerArr = query.playerRatings

	let key = Object.keys(playerRating)[row.index]
	let player = playerRating[key]
	for (let i = 0; i < player.matchStats.length; i++) {
		let matchStat = playerMatchStats[player.matchStats[i]]
		let ratingComponent = player.ratingComponents[i]
		data = {
			name: ratingComponent.matchLabel,
			rating: ratingComponent.scaledRating,
			rawScore: ratingComponent.rawScore,
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

PMSRatingTable.displayName = "PMSRatingTable";
registerComponent('PMSRatingTable', PMSRatingTable, connect(mapStateToProps, mapDispatchToProps));
