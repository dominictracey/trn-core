import React from 'react';
import {Components, registerComponent} from 'meteor/nova:core';
import {connect} from 'react-redux'

const FnRComp = (props) => {
  const { comp, category, matches, teams } = props

  let teamCats = null
  let compName
  let header
  if(Array.isArray(category) ){
    teamCats = category.filter((catComp) => catComp.attachedTeams && catComp.trnId == comp.compId)[0]
    compName = teamCats ? teamCats.name : null
    teamCats = teamCats ? teamCats.attachedTeams : null

    header = compName ? <div className="sidebar-card-divider">{compName}</div> : <div className="sidebar-card-divider"></div>
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
            <Components.FnRMatch match={match} teamCats={teamCats} homeTeam={homeTeam} visitingTeam={visitingTeam} terms={terms}/>
          )
        })
      }
    </div>
  )
}


FnRComp.displayName = "FnRComp";
const mapStateToProps = ({entities: {matches, teams}}) => ({matches, teams})
registerComponent('FnRComp', FnRComp, connect(mapStateToProps))
