import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import { registerComponent } from 'meteor/vulcan:core';


 const EspnStreamButton = (props) => {
   const { match } = props
   const streamId = match ? match.espnstreamId : null
   let btnText = ""
   const matchTime = new Date(match.date)
   const now = new Date()

   //console.log(`${matchTime} - ${now}`)
     //If our date is after the match time
   if(now >= matchTime) {
     if((now.getUTCMonth() == matchTime.getUTCMonth())
       && (now.getUTCDate() == matchTime.getUTCDate())
       && (now.getUTCHours()-matchTime.getUTCHours() >= 0 && now.getUTCHours()-matchTime.getUTCHours() < 2)) {
        // If month/day is the same, but we're within two hours of the match, show the button as "Live"
       return (
           <Link to={`http://www.espn.com/watchespn/player/_/id/${streamId}/`} target="_blank">
             <Button bsClass="statbtn" bsSize="large" bsStyle="info" >
               <img className="match-post-stream-button" src="http://a.espncdn.com/espn3/images/watchespn/logo_watch_espn-lrg.png" title="Watch Espn" />
               <div className="match-post-stream-time">(Live)</div>
             </Button>
           </Link>
         )

     }
     else {
        // If our time is more than two hours after the match, show button as "Replay"
       return (
         <Link to={`http://www.espn.com/watchespn/player/_/id/${streamId}/`} target="_blank">
           <Button bsClass="statbtn" bsSize="large" bsStyle="info" >
             <img className="match-post-stream-button" src="http://a.espncdn.com/espn3/images/watchespn/logo_watch_espn-lrg.png" title="Watch Espn" />
             <div className="match-post-stream-time">(Replay)</div>
           </Button>
         </Link>
       )
     }
   }
   else {
      // If our date is before match time.
      // Button is "scheduled" and links to Espn3's viewable match list.
     return (
       <Link to={`http://www.espn.com/watchespn/index/_/sport/rugby#type/upcoming/`} target="_blank">
         <Button bsClass="statbtn" bsSize="large" bsStyle="info" >
           <img className="match-post-stream-button" src="http://a.espncdn.com/espn3/images/watchespn/logo_watch_espn-lrg.png" title="Watch Espn" />
           <div className="match-post-stream-time">(Scheduled)</div>
         </Button>
       </Link>
     )
   }
}

EspnStreamButton.displayName = "EspnStreamButton"
registerComponent("EspnStreamButton", EspnStreamButton)
