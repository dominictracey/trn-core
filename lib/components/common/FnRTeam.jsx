import React, { Component } from 'react'
import { registerComponent } from 'meteor/nova:core'

const FnRTeam = (props, context) => {

  return (
    <div className="FnR-match-team">
      <img className="FnR-match-teamLogo" src={props.logo} title={props.title}/>
      {props.abbr}
    </div>
  )

}

registerComponent("FnRTeam", FnRTeam)
