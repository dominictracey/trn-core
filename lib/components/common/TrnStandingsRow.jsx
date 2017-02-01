import React from 'react';
import { Components, registerComponent } from 'meteor/nova:core';
import { getTeamLogoUrl } from '../../helpers';
import Categories from 'meteor/nova:categories';

const TrnStandingsRow = (props) => {

  const { standing, team } = props
  
  // the team received as a prop is not a team from our db but from TRN API (redux)
  // to grab the logo, we explicitly declares the category type related to our db
  const logo = Categories.getLogo(team, 'team');
  
  return (
    <div className="standings-row">
      <div className="standings-col standings-col-ordinal">{standing.standing}</div>
      <div className="standings-col"><img className="standings-col-logo" src={logo}/></div>w
      <div className="standings-col standings-col-name">{team.displayName}</div>
    </div>
  )
}

TrnStandingsRow.displayName = "TrnStandingsRow";
registerComponent('TrnStandingsRow', TrnStandingsRow) //, connect(mapStateToProps));
