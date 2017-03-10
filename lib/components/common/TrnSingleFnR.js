import React from 'react';
import {FormattedTime, FormattedDate, FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import {Components, registerComponent, Utils, withCurrentUser, withList} from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Users from 'meteor/nova:users'
import Posts from 'meteor/nova:posts'

const TrnSingleFnR = (props) => {
  const { comp, category } = props

  let teamCats = null
  let tempComp
  let compName
  let header
  if(Array.isArray(category) ){
    teamCats = category.filter((catComp) => catComp.attachedTeams && catComp.trnId == comp.compId)[0]
    tempComp = teamCats ? teamCats : null
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
        comp.matches.map((match, index) => {
          const teams = teamCats ? teamCats.filter((team) => team.trnId == match.homeTeamId || team.trnId == match.visitingTeamId) : null
          tempComp ? teams[2] = tempComp : null
          const homeLogo = match.homeTeam ? Categories.getLogo(match.homeTeam, 'team') : null
          const visitingLogo = match.homeTeam ? Categories.getLogo(match.visitingTeam, 'team') : null
          const activeMatch = doesPostExist(props, match) ? "FnR-match-active" : "FnR-match"

          if (match.status.includes('FINAL') || match.status.includes('UNDERWAY') || match.status.includes('HALFTIME')) {
            let matchStatus = 'UW'
            if(match.status.includes('FINAL')) {
              matchStatus = 'FT'
            }
            else if(match.status.includes('FIRST')){
              matchStatus = '1H'
            }
            else if(match.status.includes('HALFTIME')){
              matchStatus = 'HT'
            }
            else if(match.status.includes('SECOND')){
              matchStatus = '2H'
            }
            return (
              <div className={activeMatch} key={match.id}>
                <div className="FnR-match-team">
                  <img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName}/>
                  {match.homeTeam.abbr}
                </div>

                {generatePost(props, match, teams,
                  <span className="FnR-match-scores">
                    {match.simpleScoreMatchResult.homeScore + " - "  + match.simpleScoreMatchResult.visitScore}
                    <div className="FnR-match-status">{`(${matchStatus})`}</div>
                  </span>
                )}

                <div className="FnR-match-team">
                  <img className="FnR-match-teamLogo" src={visitingLogo} title={match.visitingTeam.displayName}/>
                  {match.visitingTeam.abbr}
                </div>
              </div>
            )
          }
          else {
            return (
              <div className={activeMatch} key={match.id}>
                <div className="FnR-match-team">
                  <img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName}/>
                  {match.homeTeam.abbr}
                </div>

                <div className="FnR-match-date">
                  <div className="FnR-matchData FnR-match-time">
                    {generatePost(props, match, teams, <FormattedDate value={new Date(match.date)} year='numeric'
                                                                      month='short' day='2-digit'/>)}
                  </div>
                  <div className="FnR-matchData FnR-match-time">
                    <FormattedTime value={new Date(match.date)}/>
                  </div>
                </div>

                <div className="FnR-match-team">
                  <img className="FnR-match-teamLogo" src={visitingLogo} title={match.visitingTeam.displayName}/>
                  {match.visitingTeam.abbr}
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

this.generatePost = function (props, match, teams, component) {
  const {currentUser} = props
  let link = <div className="FnR-link"><Link>{component}</Link></div>
  let linkNoClick = <div className="FnR-noLink">{component}</div>

  if (doesPostExist(props, match) == null) {
    if (Users.canDo(currentUser, 'posts.new.match')) {
      return (
        <Components.ModalTrigger
          size="large"
          title={
            <div>
              <FormattedMessage id="posts.new_post"/>
              <Components.WiresNewButton prefilledProps={{context: `new post form`}}/>
            </div>
          }
          component={link}
        >
          <Components.PostsNewForm trnId={match.id} teams={teams} title={match.displayName}/>
        </Components.ModalTrigger>
      )
    }
    else {
      return linkNoClick
    }
  }
  else {
    return <div className="FnR-link"><Link to={`x/${doesPostExist(props, match).slug}`}>{component}</Link></div>
  }

}

this.doesPostExist = (props, match) => {
  const {results: posts} = props
  for (let post in posts) {
    if (posts[post].trnId && posts[post].trnId == match.id) {
      return posts[post]
    }
  }
  return null
}

// TrnSingleFnR.propTypes = {
//   currentUser: React.PropTypes.object,
// };
const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
};

TrnSingleFnR.displayName = "TrnSingleFnR";
registerComponent('TrnSingleFnR', TrnSingleFnR, withCurrentUser, [withList, options])
