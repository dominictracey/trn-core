import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { FormattedTime, FormattedDate, FormattedMessage } from 'react-intl';
import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';

import Categories from 'meteor/vulcan:categories';
import Posts from 'meteor/vulcan:posts'

class FnRMatch extends Component {
	constructor(props) {
		super(props)

		this.doesPostExist = this.doesPostExist.bind(this)
	}

  render() {
    const { match, simpleScoreMatchResults, compCat, teamCats, homeTeam, visitingTeam } = this.props

    // these are the team categories to tag the match thread with if we are an admin and can do so. Filter out only
    let teams = teamCats ? teamCats.filter((team) => team.trnId == match.homeTeamId || team.trnId == match.visitingTeamId) : null
    teams[2] = compCat                            // Set the 3rd item of teamCats to the competition
                                                  // category (need slug for form)

    const homeLogo = homeTeam ? Categories.getLogo(homeTeam, 'team') : null
    const visitingLogo = visitingTeam ? Categories.getLogo(visitingTeam, 'team') : null

    const activeMatch = this.doesPostExist(match) ? "FnR-match-active" : "FnR-match"

    if (match.status != 'SCHEDULED') {      //Active match
      const results = match.simpleScoreMatchResultId ? simpleScoreMatchResults[match.simpleScoreMatchResultId] : null

      return (
          <div className={activeMatch} key={match.id}>
            <div className="FnR-match-teamData">
              <Components.FnRTeam logo={homeLogo} title={homeTeam.displayName} abbr={match.homeTeam.abbr}/>

              {results
              ? <Components.FnRGuts match={match} teams={teams}
                component=
                  {<span className="FnR-match-scores">{results.homeScore + " - "  + results.visitScore}<Components.FnRStatus status={match.status} /></span>}
                refPost={this.doesPostExist()}
                />
              : <Components.FnRGuts match={match} teams={teams}
                  component={<div className="FnR-match-time"><FormattedDate value={new Date(match.date)} month='short' day='2-digit'/></div>}
                  refPost={this.doesPostExist()}
                />}

              <Components.FnRTeam logo={visitingLogo} title={visitingTeam.displayName} abbr={match.visitingTeam.abbr}/>
            </div>
            <Components.FnRStream streamId={match.espnstreamId}/>
          </div>
        )
    } else {

      return (
        <div className={activeMatch} key={match.id}>
          <div className="FnR-match-teamData">
            <Components.FnRTeam logo={homeLogo} title={homeTeam.displayName} abbr={match.homeTeam.abbr}/>

            <Components.FnRGuts match={match} teams={teams} component={
              <div className="FnR-match-time-group"><div className="FnR-match-time"><FormattedDate value={new Date(match.date)} month='short' day='2-digit'/></div>
                <div className="FnR-match-time"><FormattedTime value={new Date(match.date)}/></div>
              </div>}
              refPost={this.doesPostExist()}
            />

            <Components.FnRTeam logo={visitingLogo} title={visitingTeam.displayName} abbr={match.visitingTeam.abbr}/>
          </div>
          <Components.FnRStream streamId={match.espnstreamId}/>
        </div>
      )
    }
  }

  // generatePost(match, teams, component) {
  //   const { currentUser } = this.props
  //
  //
  //   let link = <div className="FnR-link"><Link>{component}</Link></div>
  //   let linkNoClick = <div className="FnR-noLink">{component}</div>
  //
  //   if (this.doesPostExist(match) == null) {
  //     if (Users.canDo(currentUser, 'posts.new.match')) {
  //       return (
  //         <Components.ModalTrigger
  //           size="large"
  //           title={
  //             <div>
  //               <FormattedMessage id="posts.new_post"/>
  //               <Components.WiresNewButton prefilledProps={{context: `new post form`}}/>
  //             </div>
  //           }
  //           component={link}
  //         >
  //           <Components.PostsNewForm trnId={match.id} teams={teams} title={match.displayName}/>
  //         </Components.ModalTrigger>
  //       )
  //     }
  //     else {
  //       return linkNoClick
  //     }
  //   } else {
  //     return <div className="FnR-link"><Link to={`x/${this.doesPostExist(match).slug}`}>{component}</Link></div>
  //   }
  //
  // }

  doesPostExist(match) {
    if (this.props.results && this.props.results.length)
      return this.props.results[0];   // Called refPost when passed as props.
    else
      return null;
  }
}

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
};

FnRMatch.displayName = "FnRMatch";

const mapStateToProps = ({entities: { simpleScoreMatchResults }}) => ({ simpleScoreMatchResults })
registerComponent('FnRMatch', FnRMatch, withCurrentUser, [withList, options], connect(mapStateToProps))
