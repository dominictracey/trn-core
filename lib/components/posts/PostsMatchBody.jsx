//import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActions, Components, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime } from 'react-intl'
import _ from 'lodash'
import { Grid, Col, Row, Button, ButtonGroup } from 'react-bootstrap'

class PostsMatchBody extends Component {

  constructor(props) {
    super(props);

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
      if(match.venue){
        venue = match.venue
        venueCity = venue.venueCity != null ? venue.venueCity : null
        venueName = venue.venueName != null ? venue.venueName : null
      }
      date = new Date(match.date)
      if (match.simpleScoreMatchResultId) {
        const result = simpleScoreMatchResults[match.simpleScoreMatchResultId]

          if(_.includes(status,'FINAL')) {
	          score = ` ${result.homeScore} - ${result.visitScore} `
	          status = 'Final'
            date = null
          }
	        else if(_.includes(status,'FIRST')) {
		        score = ` ${result.homeScore} - ${result.visitScore} `
		        status = 'First half'
	          date = null
	        }
	        else if(_.includes(status,'HALFTIME')) {
		        score = ` ${result.homeScore} - ${result.visitScore} `
		        status = 'Halftime'
	          date = null
	        }
	        else if(_.includes(status,'SECOND')) {
		        score = ` ${result.homeScore} - ${result.visitScore} `
		        status = 'Second half'
	          date = null
	        }
          else {
            score = null
            status = 'Scheduled'
          }


      }
    }
    let matchStats
      if(match && type == 'teams' && this.state.toggleTeam){
        matchStats = <Components.MatchStats trnId={post.trnId} match={match} type={type} />
      }
      else if(match && type == 'players' && this.state.togglePlayer){
          matchStats = <Components.MatchStats trnId={post.trnId} match={match} type={type} />
      }
      else{
        matchStats = null
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
          <ButtonGroup justified>
            <Button bsStyle="info" bsSize="small" onClick={() => this.setState({toggleTeam: !this.state.toggleTeam, togglePlayer: false,})} >
              <Link to={`/x/${post.slug}/stats/teams`}>Team Stats</Link>
            </Button>
            <Button bsStyle="info" bsSize="small" onClick={() => this.setState({togglePlayer: !this.state.togglePlayer, toggleTeam: false,})} >
              <Link to={`/x/${post.slug}/stats/players`}>Player Stats</Link>
            </Button>
            <Button bsStyle="info" bsSize="small" ><Link to={``}>Top Ten</Link></Button>
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
