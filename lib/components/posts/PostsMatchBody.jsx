//import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActions, Components, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl'
import _ from 'lodash'
import { Grid, Col, Row, Button, ButtonGroup } from 'react-bootstrap'

class PostsMatchBody extends Component {

  constructor() {
    super();
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
      if (_.includes(status,'FINAL') && match.simpleScoreMatchResultId) {
        const result = simpleScoreMatchResults[match.simpleScoreMatchResultId]
        score = ' ' + result.homeScore + ' - ' + result.visitScore + ' '
        status = 'Final'
      }
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
          <div className='matchDate'><FormattedDate value={date}/> <FormattedTime value={date}/></div>
        </Col></Row><Row><Col>
	        <ButtonGroup justified>
		        <Button bsStyle="info" bsSize="small" ><Link to={`/x/${post.slug}/stats/teams`}>Team Stats</Link></Button>
		        <Button bsStyle="info" bsSize="small" ><Link to={`/x/${post.slug}/stats/players`}>Player Stats</Link></Button>
		        <Button bsStyle="info" bsSize="small" ><Link to={``}>Top Ten</Link></Button>
	        </ButtonGroup>
        </Col></Row>
        <Row><Col>
	        {
		        match && type ? <Components.MatchStats trnId={post.trnId} match={match} type={type} /> : null
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
