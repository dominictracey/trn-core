import React from 'react';
import { FormattedTime, FormattedDate, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Components, registerComponent, Utils, withCurrentUser, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Users from 'meteor/nova:users'
import Posts from 'meteor/nova:posts'

const TrnSingleFnR = (props) => {
  const { comp, category } = props

  return (
    <div className='sidebar-card-body'>

      {
        comp.matches.map((match, index) => {
          const teamCats = category.attachedTeams
          const teams = teamCats.filter((team) => team.trnId == match.homeTeamId || team.trnId == match.visitingTeamId)
          const homeLogo = match.homeTeam ? Categories.getLogo(match.homeTeam, 'team') : null
          const visitingLogo = match.homeTeam ? Categories.getLogo(match.visitingTeam, 'team') : null

          if(match.status.includes('FINAL')){
            return(
              <div className="FnR-match" key={match.id}>
                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.homeTeam.abbr}</div>
                </div>

                {generatePost(props, match, teams, <span className="FnR-match-scores">
                                              <div className="FnR-match-teamScore">{match.simpleScoreMatchResult.homeScore}</div>
                                              <div className="FnR-match-teamScore"> - </div>
                                            <div className="FnR-match-teamScore">{match.simpleScoreMatchResult.visitScore}</div>
                  </span>
                  )}

                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={visitingLogo} title={match.visitingTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.visitingTeam.abbr}</div>
                </div>
              </div>
            )
          }
          else {

            return(
              <div className="FnR-match" key={match.id}>
                <div className="FnR-match-team">
                  <div className="FnR-matchData"><img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName} /></div>
                  <div className="FnR-matchData">{match.homeTeam.abbr}</div>
                </div>

                <div className="FnR-match-date">
                  <div className="FnR-matchData FnR-match-time">
                    {generatePost(props,match,teams, <FormattedDate value={new Date(match.date)} year='numeric' month='long' day='2-digit' />)}
                  </div>
                  <div className="FnR-matchData FnR-match-time">
                    <FormattedTime value={new Date(match.date)}/>
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

this.generatePost = function(props, match, teams, component){
  const { currentUser } = props
  let link = <div className="FnR-link"><Link>{component}</Link></div>
  let linkNoClick = <div>{component}</div>

  if(!doesPostExist(props, match)){
    if(Users.canDo(currentUser, 'posts.new.match')) {
      return (
        <Components.ModalTrigger
          size="large"
          title={
            <div>
              <FormattedMessage id="posts.new_post" />
              <Components.WiresNewButton prefilledProps={{context: `new post form`}} />
            </div>
          }
          component={link}
        >
          <Components.PostsNewForm trnId={match.id} teams={teams} />
        </Components.ModalTrigger>
      )
    }
    else {
      return linkNoClick
    }
  }
  else {
    return linkNoClick
  }

}

this.doesPostExist = (props, match) => {
  const { results: posts } = props
  for (let post in posts){
    if(posts[post].trnId && posts[post].trnId == match.id){
      return true
    }
  }
  return false
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
