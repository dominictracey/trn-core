//import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActions, getSetting, Components, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime } from 'react-intl'
import _ from 'lodash'
import { Grid, Col, Row, Button, ButtonGroup } from 'react-bootstrap'

let setPollCnt = 0   //Global var to track how many times the polling has been set
class PostsMatchBody extends Component {

  constructor(props) {
    super(props);

    this.matchScorePoll = this.matchScorePoll.bind(this)

    //Component properties pertaining to button toggles.
    switch(props.type){
        case 'players' : this.state = {
            toggleTeam : false,
            togglePlayer : true,
        }
        break
        case 'teams' : this.state = {
            toggleTeam : true,
            togglePlayer : false,
        }
        break
        default : this.state = {
            toggleTeam : false,
            togglePlayer : false,
        }
    }
    // this.state = {
    //   toggleTeam : false,
    //   togglePlayer : false,
    // }
  }

  async componentDidMount() {
    const {loadMatch, post} = this.props;
    await loadMatch([post.trnId]);
  }

  // Ugly function that will refresh matches
  async matchScorePoll() {
    const { post, loadMatch } = this.props
	  let match = await this.props.matches[post.trnId]
    let pollInt = getSetting('trnPollTime') && getSetting('trnPollTime') != 0 ? getSetting('trnPollTime', 600)*1000 : null

    setPollCnt += 1    //Increment polling count
    let poll = pollInt && setPollCnt <= 1    //Ensure polling doesn't get set a million times.
      ? setInterval( async () => {
        const {matches} = this.props

        if(!_.includes(match.status, 'FINAL') || !_.includes(match.status, 'SCHEDULED')){
	        await loadMatch(post.trnId)         // Load match from Api
	        match = await matches[post.trnId]   // Update var for .status
	        if(_.includes(match.status, 'FINAL') || _.includes(match.status, 'SCHEDULED')){
		        clearInterval(poll)               // Clear polling.
            console.log("Polling ended.")
            return
	        }

          console.log("Refreshed match")
        }
        else {
          clearInterval(poll)
        }
      }, pollInt)
      : null
  }

  render() {
    const { post, matches={}, type, teams={}, simpleScoreMatchResults={} } = this.props

    const match = matches[post.trnId]

    if (!match) {
      const Loading = Components.Loading;
      return ( <Loading/> )
    }
    var status = 'waiting'
    var homeAbbr = 'NON'
    var visitAbbr = 'NON'
    var homeName = ''
    var visitName = ''
    var venue = {}
    var venueCity = null
    var venueName = null
    var score = ' vs. '
    var date = ''


    if (match && match.status) {
      status = match.status
      homeAbbr = teams[match.homeTeamId].abbr + ' teamlogo-med homeLogo'
      visitAbbr = teams[match.visitingTeam].abbr + ' teamlogo-med visitLogo'
      homeName = teams[match.homeTeamId].displayName
      visitName = teams[match.visitingTeam].displayName
      date = new Date(match.date)

      if(match.venue){
        venue = match.venue
        venueCity = venue.venueCity != null ? venue.venueCity : null
        venueName = venue.venueName != null ? venue.venueName : null
      }

      if (match.simpleScoreMatchResultId) {
        // result = simpleScoreMatchResults from redux store
        const result = simpleScoreMatchResults[match.simpleScoreMatchResultId]

        // The match's status display depends on TRN foundation status.
          if(_.includes(status,'FINAL')) {
	          score = ` ${result.homeScore} - ${result.visitScore} `
	          status = 'Final'
            date = null
          }
	        else if(_.includes(status,'FIRST')) {
		        score = ` ${result.homeScore} - ${result.visitScore} `
		        status = 'First half'
	          date = null
              //Set polling for score and status
            if(getSetting('trnPollTime') && getSetting('trnPollTime') > 0) {
	            this.matchScorePoll()
            }
	        }
	        else if(_.includes(status,'HALFTIME')) {
		        score = ` ${result.homeScore} - ${result.visitScore} `
		        status = 'Halftime'
	          date = null
              //Set polling for score and status
	          if(getSetting('trnPollTime') && getSetting('trnPollTime') > 0) {
		          this.matchScorePoll()
	          }
          }
	        else if(_.includes(status,'SECOND')) {
		        score = ` ${result.homeScore} - ${result.visitScore} `
		        status = 'Second half'
	          date = null
              //Set polling for score and status
	          if(getSetting('trnPollTime') && getSetting('trnPollTime') > 0) {
		          this.matchScorePoll()
	          }
          }
	        // Only matches that are "scheduled" will display the match time
          else {
            score = null
            status = 'Scheduled'
          }
      }
    }
      //Mount MatchStats component, based on which button is toggled.
    let matchStats
      if((match && type == 'teams' && this.state.toggleTeam) || (match && type == 'players' && this.state.togglePlayer)){
        matchStats = <Components.MatchStats trnId={post.trnId} match={match} type={type} />
      }
      // else if(match && type == 'players' && this.state.togglePlayer){
      //     matchStats = <Components.MatchStats trnId={post.trnId} match={match} type={type} />
      // }
      else{
        matchStats = null
      }

      //Set the button for stream, depending on current time vs match time.
      // Pass the button the match and let it determine the time difference.
    let streamButton
	  if(match && match.espnstreamId){
      streamButton = <Components.EspnStreamButton match={match} />
    }

    return (
      <div>
        <Grid><Row><Col md={4}>
          <div className={homeAbbr}></div><div className='matchTeamName matchTeamName-home'>{homeName}</div>
        </Col><Col md={4}>
          <div className='matchScore'>{score}</div>
        </Col><Col md={4}><div className='matchTeamName matchTeamName-visit'>{visitName}</div><div className={visitAbbr}></div>
        </Col></Row><Row><Col md={12}>
          <div className='matchStatus'>{status}</div>
          <div className="matchVenue">{venueName}<br/>{venueCity}</div>
          { date ? <div className='matchDate'><FormattedDate value={date}/> <FormattedTime value={date}/></div> : null}
        </Col></Row><Row><Col>
          <ButtonGroup bsClass="btn-group-matchStats">

                <Link to={`/x/${post.slug}/stats/teams`}>
                  <Button bsClass="statbtn" bsSize="large" bsStyle="info" onClick={() => this.setState({toggleTeam: !this.state.toggleTeam, togglePlayer: false,})}
                          active={this.state.toggleTeam}>
                    Team Stats
                  </Button>
                </Link>
                <Link to={`/x/${post.slug}/stats/players`}>
                  <Button bsClass="statbtn" bsSize="large" bsStyle="info" onClick={() => this.setState({togglePlayer: !this.state.togglePlayer, toggleTeam: false,})}
                          active={this.state.togglePlayer}>
                    Player Stats
                  </Button>
                </Link>
            {
              streamButton
            }
          </ButtonGroup>
        </Col></Row>
        <Row><Col>
          {
            match && type && matchStats ? matchStats : null
          }
        </Col></Row></Grid>
      </div>
    )
  }
}


PostsMatchBody.propTypes = {
  matches: React.PropTypes.object,
  post: React.PropTypes.object,
  flash: React.PropTypes.func,
}

const mapStateToProps = ({entities: { matches, teams, simpleScoreMatchResults } }) => ({ matches, teams, simpleScoreMatchResults });

const { loadMatch } = getActions();

const mapDispatchToProps = dispatch => bindActionCreators({ loadMatch }, dispatch);

registerComponent('PostsMatchBody', PostsMatchBody, withMessages, connect(mapStateToProps, mapDispatchToProps));
