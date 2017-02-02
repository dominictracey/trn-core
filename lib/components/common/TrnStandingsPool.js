import React from 'react';
import { Components, registerComponent, Utils } from 'meteor/nova:core';

const TrnStandingsPool = (props) => {
  const {pool, name, teams} = props

  return (
    <div>
      <div className="sidebar-card-divider">{name}</div>
      <div>
        {pool.map((standing, key) => {
          return (
            <Components.TrnStandingsRow key={standing.id.toString()} standing={standing} teams={teams}/>
          )
        })}
      </div>
    </div>
  )
}

TrnStandingsPool.displayName = "TrnStandingsPool";
registerComponent('TrnStandingsPool', TrnStandingsPool)
