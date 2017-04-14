import React from 'react'
import { Components, Utils, getActions, registerComponent } from 'meteor/vulcan:core';
import _ from 'lodash'

const MatchLabel = (props) => {
	const { label } = props

	let labSplit = label && label.length > 0 ? _.split(label, " ") : null
	let teamHomeLogo = <img src={Utils.getLogoFromAbbr(labSplit[0])} title={labSplit[0]} />
	let teamAwayLogo = <img src={Utils.getLogoFromAbbr(labSplit[3])} title={labSplit[3]} />

	return (
		<div className="ratingTable-matchLabel">
			<div className="ratingTable-matchLabel-teams">
				<span>{labSplit ? teamHomeLogo : null} {labSplit ? labSplit[1] : null}</span> - <span>{labSplit ? teamAwayLogo : null} {labSplit ? labSplit[4] : null}</span>
			</div>
		</div>
	)
}


registerComponent('MatchLabel', MatchLabel,); //connect(mapStateToProps, mapDispatchToProps));
