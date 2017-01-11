import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions, registerComponent, withMessages } from 'meteor/nova:core';
import { FormattedDate, FormattedTime } from 'react-intl'
import _ from 'lodash'
import { Grid, Col, Row, Button, ButtonGroup } from 'react-bootstrap'

class MatchBody extends Component {

  constructor() {
    super();
    this.showStats = this.showStats.bind(this);
  }

  componentDidMount() {
    const {loadMatch, post} = this.props
    loadMatch([post.trnId]);
    this.setState({loading: false});
  }

  async showStats() {
    const { post, matches={}, loadTeamMatchStats, loadPlayerMatchStats, flash } = this.props

      const index = 0

    try {
      if (index === 0) {
        console.log('fetch start');
        this.setState({loading: true});

        await loadTeamMatchStats(post.trnId, matches[post.trnId].homeTeamId)


        console.log('fetch end');
        this.setState({loading: false});
        flash(`Team Match Stats for "${matches[post.trnId].displayName}" fetched!`, 'success');
        this.setState({
          showTeamStats: 0,
          showPlayerStats: -1,
        })


      } else if (index === 1) {
        loadTeamMatchStats(post.trnId, matches[post.trnId].visitingTeamId)
      } else if (index === 2) {
        loadPlayerMatchStats(post.trnId, matches[post.trnId].homeTeamId)
      } else if (index === 3) {
        loadPlayerMatchStats(post.trnId, matches[post.trnId].visitingTeamId)
      }
    } catch(e) {
      // flash(`Error fetching comp: ${e}`, "error");
      console.log(`Error fetching comp: ${e}`, "error");
    }
  }

  render() {
    const { post, matches={}, teams={}, simpleScoreMatchResults={}} = this.props

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
    var score = ' vs. '
    var date = ''
    var teamStats = null

    if (match && match.status) {
      status = match.status
      homeAbbr = teams[match.homeTeamId].abbr + ' teamlogo-med homeLogo'
      visitAbbr = teams[match.visitingTeam].abbr + ' teamlogo-med visitLogo'
      homeName = teams[match.homeTeamId].displayName
      visitName = teams[match.visitingTeam].displayName
      date = new Date(match.date)
      if (_.includes(status,'FINAL') && match.simpleScoreMatchResultId) {
        const result = simpleScoreMatchResults[match.simpleScoreMatchResultId]
        score = ' ' + result.homeScore + ' - ' + result.visitScore + ' '
        status = 'Final'
      }

      // teamStats = this.state.showTeamStats ? <TeamStatsPanel matchId={match.id} home={0}/> : null
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
          <div className='matchDate'><FormattedDate value={date}/> <FormattedTime value={date}/></div>
        </Col></Row><Row><Col>
          <div className='teamStatsPanel'>{teamStats}</div>
        </Col></Row></Grid>
        <ButtonGroup justified>
          <Button bsStyle="info" bsSize="small" onClick={this.showStats}>{this.state.loading ? <Components.Loading /> : <span>{homeName} Team Stats</span>}</Button>
          <Button bsStyle="info" bsSize="small">{visitName} Team Stats</Button>
          <Button bsStyle="info" bsSize="small">{homeName} Player Stats</Button>
          <Button bsStyle="info" bsSize="small">{visitName} Player Stats</Button>
          <Button bsStyle="info" bsSize="small">Top Ten Performances</Button>
        </ButtonGroup>
      </div>
    )
  }
}

MatchBody.propTypes = {
  matches: React.PropTypes.object,
  post: React.PropTypes.object,
  flash: React.PropTypes.func,
}

const mapStateToProps = state => {
  const { entities } = state
  const { matches, teams, simpleScoreMatchResults } = entities

  return {
    matches,
    teams,
    simpleScoreMatchResults,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({loadMatch: Actions.loadMatch, loadTeamMatchStats: Actions.loadTeamMatchStats, loadPlayerMatchStats: Actions.loadPlayerMatchStats}, dispatch);

//export default connect(mapStateToProps, mapDispatchToProps)(MatchBody)
registerComponent('MatchBody', MatchBody, withMessages, connect(mapStateToProps, mapDispatchToProps));
