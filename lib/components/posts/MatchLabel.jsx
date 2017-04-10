import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Components, Utils, getActions, registerComponent } from 'meteor/vulcan:core';
import {FormattedMessage} from 'react-intl'
import ReactTable from 'react-table'
import Link from 'react-router'
import _ from 'lodash'

const MatchLabel = (props) => {
	const { label } = props

	let labSplit = label ? _.split(label, " ") : null
	let teamHomeLogo = <img src={Utils.getLogoFromAbbr(labSplit[0])} title={labSplit[0]} />
	let teamAwayLogo = <img src={Utils.getLogoFromAbbr(labSplit[3])} title={labSplit[3]} />

	return (
		<div className="ratingTable-matchLabel">
			<div className="ratingTable-matchLabel-teams"><span>{labSplit ? teamHomeLogo : null}{labSplit[1]}</span> - <span>{labSplit ? teamAwayLogo : null}{labSplit[4]}</span></div>
			<div className="ratingTable-matchLabel-round">{labSplit[5] ? labSplit[5] : null}</div>
		</div>
	)
}


registerComponent('MatchLabel', MatchLabel,); //connect(mapStateToProps, mapDispatchToProps));
