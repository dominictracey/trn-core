import React from 'react';
import { FormattedTime, FormattedDate } from 'react-intl';
import { Link } from 'react-router';
import { Components, registerComponent, Utils } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Users from 'meteor/nova:users'

const TrnSingleFnR = (props) => {
  const { comp, category } = props

  return (
    <div className='sidebar-card-body'>

      {
        comp.matches.map((match, index) => {
          const homeLogo = match.homeTeam ? Categories.getLogo(match.homeTeam, 'team') : null
          const visitingLogo = match.homeTeam ? Categories.getLogo(match.visitingTeam, 'team') : null

          if(match.status.includes('FINAL')){
            return(
              <div className="FnR-match" key={match.id}>
                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.homeTeam.abbr}</div>
                </div>

                <span className="FnR-match-scores" >
                  <div className="FnR-match-teamScore">{match.simpleScoreMatchResult.homeScore}</div>
                  <div className="FnR-match-teamScore"> - </div>
                  <div className="FnR-match-teamScore">{match.simpleScoreMatchResult.visitScore}</div>
                </span>

                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={visitingLogo} title={match.visitingTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.visitingTeam.abbr}</div>
                </div>
              </div>
            )
          }
          else {
            let dateTime = new Date(match.date)

            return(
              <div className="FnR-match" key={match.id}>
                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.homeTeam.abbr}</div>
                </div>

                <div className="FnR-match-date">
                  <div className="FnR-matchData FnR-match-time">
                    <FormattedDate value={dateTime} year='numeric' month='long' day='2-digit' />
                  </div>
                  <div className="FnR-matchData FnR-match-time">
                    <FormattedTime value={dateTime}/>
                  </div>

                </div>


                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={visitingLogo} title={match.visitingTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.visitingTeam.abbr}</div>
                </div>
              </div>
            )
          }

        })
      }
    </div>
  )
}

TrnSingleFnR.createPost = function(props, category, match){
  if(Users.canDo(props.currentUser, posts.edit.all)) {

  }
}

TrnSingleFnR.displayName = "TrnSingleFnR";
registerComponent('TrnSingleFnR', TrnSingleFnR)
