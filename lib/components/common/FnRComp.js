import React from 'react';
import {Components, registerComponent} from 'meteor/vulcan:core';
import {connect} from 'react-redux'

const FnRComp = (props) => {
  const { comp, category, matches, teams } = props

  let teamCats = null
  let compCat
  let compName
  let header
  if(Array.isArray(category) ){
    teamCats = category.filter((catComp) => catComp.attachedTeams && catComp.trnId == comp.compId)[0] //Start as comp category
    compName = teamCats ? teamCats.name : null    // Save competition displayName
    compCat = teamCats ? teamCats : null          // Save competition category
    teamCats = teamCats ? teamCats.attachedTeams : null   // teamCats = all team cats attached to comp.

    header = compName ?
      <div className="sidebar-card-divider">
        <div className="sidebar-card-divider-name">{compName}</div>
        <div className="header-placeholder"></div>
      </div>
      : <div className="sidebar-card-divider"></div>
  }
  else{
    teamCats = category.attachedTeams
  }

  return (
    <div className='FnR-body'>
      {
        header ? header : null
      }
      {
        comp.matches.map((matchId, index) => {
          const match = matches[matchId];
          const homeTeam = teams[match.homeTeam];
          const visitingTeam = teams[match.visitingTeam];
          const terms = {view: "matchPost", trnId: matchId};
          return (
            <Components.FnRMatch
              match={match}
              teamCats={teamCats}
              compCat={compCat}
              homeTeam={homeTeam}
              visitingTeam={visitingTeam}
              terms={terms}
              key={index}
            />
          )
        })
      }
    </div>
  )
}


FnRComp.displayName = "FnRComp";
const mapStateToProps = ({entities: {matches, teams}}) => ({matches, teams})
registerComponent('FnRComp', FnRComp, connect(mapStateToProps))
