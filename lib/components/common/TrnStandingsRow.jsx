import React from 'react';
import { Link } from 'react-router';
import { Components, registerComponent, Utils } from 'meteor/nova:core';
import { getTeamLogoUrl } from '../../helpers';
import Categories from 'meteor/nova:categories';

const TrnStandingsRow = (props) => {

  const { standing, team } = props
  
  // the team received as a prop is not a team from our db but from TRN API (redux)
  // to grab the logo, we explicitly declares the category type related to our db
  const logo = Categories.getLogo(team, 'team')
  const prefix = Utils.getSiteUrl().slice(0,-1)
  const pathname = `/t/${team.snakeCaseDisplayName}/`
  
  return (
    <div className="standings-row">
      <div className="standings-col standings-col-ordinal">{standing.standing}</div>
      <div className="standings-col"><img className="standings-col-logo" src={logo}/></div>
      <div className="standings-col standings-col-name"><Link  to={pathname}>{team.displayName}</Link></div>
      <div className="standings-col standings-col-stats">{standing.wins}</div>
      <div className="standings-col standings-col-stats">{standing.losses}</div>
      <div className="standings-col standings-col-stats">{standing.draws}</div>
      <div className="standings-col standings-col-stats">{standing.points}</div>
    </div>
  )
}

TrnStandingsRow.displayName = "TrnStandingsRow";
registerComponent('TrnStandingsRow', TrnStandingsRow) //, connect(mapStateToProps));
