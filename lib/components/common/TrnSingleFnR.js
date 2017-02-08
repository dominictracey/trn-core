import React from 'react';
import { Link } from 'react-router';
import { Components, registerComponent, Utils } from 'meteor/nova:core';

const TrnSingleFnR = (props) => {
  const { comp } = props

  return (
    <div className='sidebar-card-body'>
      <div className="sidebar-card-divider">{comp.compId}</div>
      {
        comp.matches.map((match, index) => {
          return(
            <div className="FnR-match" key={match.id}>
              <div className="sidebar-card-header FnR-matchData">{match.displayName}</div>
              <div className="FnR-matchData">{match.status}</div>
              <div className="FnR-matchData">{match.date}</div>
            </div>
          )
        })
      }
    </div>
  )
}




TrnSingleFnR.displayName = "TrnSingleFnR";
registerComponent('TrnSingleFnR', TrnSingleFnR) //, connect(mapStateToProps));
