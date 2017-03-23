import React, { Component } from 'react';
import { registerComponent } from 'meteor/vulcan:core'

const FnRStatus = (props, context) => {
  const { status } = props

  let matchStatus = 'UW'

  if (status.includes('FINAL') || status.includes('UNDERWAY') || status.includes('HALFTIME')) {

    if (status.includes('FINAL') || status.includes('POSTPONED')) {
      matchStatus = 'FT'
    } else if(status.includes('FIRST')){
      matchStatus = '1H'
    } else if(status.includes('HALFTIME')){
      matchStatus = 'HT'
    } else if(status.includes('SECOND')){
      matchStatus = '2H'
    } else if(status.includes('POSTPONED')){
      matchStatus = 'PPD'
    }
  }

  return (
    <div className="FnR-match-status">{matchStatus}</div>
  )

}

registerComponent('FnRStatus', FnRStatus)
