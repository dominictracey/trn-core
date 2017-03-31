import React, { Component, PropTypes } from 'react'
import Components from 'meteor/vulcan:core'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Utils, getActions, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'react-intl'
import ReactTable from 'react-table'
import { PMSRatingTable } from './PMSRatingTable'
import _ from 'lodash'

const RatingTable = (props) => {
  const { queryId, } = props

  let map = topRatingDataMap(props);
  return (<ReactTable
    className="rt-ratingTable"
    columns={topRatingColumnMap}
    data={map}
    pivotBy={['name']}
    defaultPageSize={10}
    //SubComponent={ (row) => {return <Components.PMSRatingTable row={row} queryId={queryId} />}}
  />)
}

const topRatingDataMap = (props) => {
  const { queryId, detailedRatingQuery, playerRating } = props

  let map = []
  const query = detailedRatingQuery[queryId]
  const playerArr = query.playerRatings

  for(let id in playerArr) {
    let player = playerRating[playerArr[id]]
    map.push({
      name: player.playerId,
      rating: player.rating,
      rawScore: player.rawScore
    })
  }
  return map
}
const topRatingColumnMap = [
  {
    header: "Ratings",
    columns: [
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
	      render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
      }
    ]
  },
  {
    header: "Stats",
    columns: [
      {
        header: "T",
	      accessor: 'T',
	      aggregate: vals => _.sum(vals),
	      render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
      },
      {
	      header: "TA",
	      accessor: 'TA',
	      aggregate: vals => _.sum(vals),
	      render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
      },
      {
	      header: "PTS",
	      accessor: 'PTS',
	      aggregate: vals => _.sum(vals),
	      render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
      },
	    {
		    header: "K",
		    accessor: 'K',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "P",
		    accessor: 'P',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "R",
		    accessor: 'R',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "MR",
		    accessor: 'MR',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "CB",
		    accessor: 'CB',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "DB",
		    accessor: 'DB',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "O",
		    accessor: 'O',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "TC",
		    accessor: 'TC',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "TM",
		    accessor: 'TM',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "MT",
		    accessor: 'MT',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "LW",
		    accessor: 'LW',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "PC",
		    accessor: 'PC',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "YC",
		    accessor: 'YC',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "RC",
		    accessor: 'RC',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
	    {
		    header: "Time",
		    accessor: 'time',
		    aggregate: vals => _.sum(vals),
		    render: row => {return <span>{row.aggregated ? row.value : row.value}</span>}
	    },
    ]
  }
]

const mapStateToProps = ({entities: { detailedRatingQuery, playerRating, playerMatchStats, playerStats } }) => ({ detailedRatingQuery, playerRating, playerMatchStats, playerStats });
const { loadTeamMatchStats, loadPlayerMatchStats } = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({ loadTeamMatchStats, loadPlayerMatchStats }, dispatch);

registerComponent('RatingTable', RatingTable, connect(mapStateToProps, mapDispatchToProps));
