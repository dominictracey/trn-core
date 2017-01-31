import React from 'react';
import { Components, registerComponent } from 'meteor/nova:core';
import { getTeamLogoUrl } from '../../helpers'
const TrnStandingsRow = (props) => {

  const { standing, team } = props

  return (
    <div className="standings-row">
      <div className="standings-col standings-col-ordinal">{standing.standing}</div>
      <div className="standings-col"><img className="standings-col-logo" src={getTeamLogoUrl(team)}/></div>
      <div className="standings-col standings-col-name">{team.displayName}</div>
    </div>
  )
}

TrnStandingsRow.displayName = "TrnStandingsRow";
registerComponent('TrnStandingsRow', TrnStandingsRow) //, connect(mapStateToProps));
