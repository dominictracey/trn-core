import React, {PropTypes, Component} from 'react';
import {FormattedTime, FormattedDate, FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import {Components, registerComponent, withCurrentUser, withList} from 'meteor/nova:core';

import Categories from 'meteor/nova:categories';
import Users from 'meteor/nova:users'
import Posts from 'meteor/nova:posts'

class FnRMatch extends Component {
	constructor(props) {
		super(props)

		this.generatePost = this.generatePost.bind(this)
    this.doesPostExist = this.doesPostExist.bind(this)
	}

  render() {
    const { match, teamCats, homeTeam, visitingTeam } = this.props

    // these are the team categories to tag the match thread with if we are an admin and can do so
    const teams = teamCats ? teamCats.filter((team) => team.trnId == match.homeTeamId || team.trnId == match.visitingTeamId) : null

    const homeLogo = homeTeam ? Categories.getLogo(homeTeam, 'team') : null
    const visitingLogo = visitingTeam ? Categories.getLogo(visitingTeam, 'team') : null
    const activeMatch = this.doesPostExist(match) ? "FnR-match-active" : "FnR-match"

    if (match.status.includes('FINAL') || match.status.includes('UNDERWAY') || match.status.includes('HALFTIME')) {
      let matchStatus = 'UW'
      if (match.status.includes('FINAL')) {
        matchStatus = 'FT'
      } else if(match.status.includes('FIRST')){
        matchStatus = '1H'
      } else if(match.status.includes('HALFTIME')){
        matchStatus = 'HT'
      } else if(match.status.includes('SECOND')){
        matchStatus = '2H'
      }
    }
    if (match.status != 'SCHEDULED') {
      const post = this.generatePost(match, teams,
        <span className="FnR-match-scores">
          {match.simpleScoreMatchResult.homeScore + " - "  + match.simpleScoreMatchResult.visitScore}
          <div className="FnR-match-status">{matchStatus}</div>
            {/* {`(${matchStatus})`}</div> */}
        </span>
      )
      return (
          <div className={activeMatch} key={match.id}>
            <div className="FnR-match-team">
              <img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName}/>
              {match.homeTeam.abbr}
            </div>

            {post}

            <div className="FnR-match-team">
              <img className="FnR-match-teamLogo" src={visitingLogo} title={match.visitingTeam.displayName}/>
              {match.visitingTeam.abbr}
            </div>
          </div>
        )
    } else {
      const post = this.generatePost(match, teams, <FormattedDate value={new Date(match.date)} year='numeric'
                                                        month='short' day='2-digit'/>)
      return (
        <div className={activeMatch} key={match.id}>
          <div className="FnR-match-team">
            <img className="FnR-match-teamLogo" src={homeLogo} title={match.homeTeam.displayName}/>
            {match.homeTeam.abbr}
          </div>

          <div className="FnR-match-date">
            <div className="FnR-matchData FnR-match-time">
              {post}
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
  }

  generatePost(match, teams, component) {
    const {currentUser} = this.props
    let link = <div className="FnR-link"><Link>{component}</Link></div>
    let linkNoClick = <div className="FnR-noLink">{component}</div>

    if (this.doesPostExist(match) == null) {
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
    } else {
      return <div className="FnR-link"><Link to={`x/${this.doesPostExist(match).slug}`}>{component}</Link></div>
    }

  }

  doesPostExist(match) {
    if (this.props.results && this.props.results.length)
      return this.props.results[0];
    else
      return null;
    // const {results: posts} = this.props
    // for (let post in posts) {
    //   if (posts[post].trnId && posts[post].trnId == match.id) {
    //     return posts[post]
    //   }
    // }
    // return null
  }
}
// FnRMatch.propTypes = {
//   currentUser: React.PropTypes.object,
// };
const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
};

FnRMatch.displayName = "FnRMatch";

registerComponent('FnRMatch', FnRMatch, withCurrentUser, [withList, options])
