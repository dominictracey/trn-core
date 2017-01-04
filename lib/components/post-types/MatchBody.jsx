import Components from 'meteor/nova:core'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'meteor/nova:core';
import _ from 'lodash'
import { Grid, Col, Row } from 'react-bootstrap'

// const loadData = props => {
//   if (Actions.loadMatch) {
//     props.dispatch(Actions.loadMatch(props.post.trnId))
//   }
// }

class MatchBody extends Component {

  componentDidMount() {
    const {loadMatch, post} = this.props
    loadMatch([post.trnId]);
  }

  componentWillMount() {
    //loadData(this.props)
    // const { matches, post, dispatch } = this.props
    // if (!matches || !matches[post.trnId]) {
    //   dispatch(actions.loadMatch(post.trnId))
    //   console.log("waiting for match") // eslint-disable-line
    // }
  }

  render() {
    const { post, matches={}, teams={}} = this.props

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
    if (match && match.status) {
      status = match.status
      homeAbbr = teams[match.homeTeamId].abbr + ' teamlogo-small'
      visitAbbr = teams[match.visitingTeam].abbr + ' teamlogo-small'
      homeName = teams[match.homeTeamId].displayName
      visitName = teams[match.visitingTeam].displayName
    }

    return (
      <div>
        <h1>{status}</h1>
        { _.includes(status,'FINAL')
            ? <Grid><Row><Col  xs={1} md={2}><div className={homeAbbr}></div></Col><Col xs={10} md={8}><div className='matchResultHeader'>{homeName} vs. {visitName}</div></Col><Col xs={1} md={2}><div className={visitAbbr}></div></Col></Row></Grid>
            : <Grid><Row><span className={homeAbbr}></span><h3>{homeName} FINITO {visitName}</h3><span className={visitAbbr}></span></Row></Grid>
        }
      </div>
    )
  }
}

MatchBody.propTypes = {
  matches: React.PropTypes.object,
  post: React.PropTypes.object,
}

const mapStateToProps = state => {
  const { entities } = state
  const { matches, teams } = entities

  return {
    matches,
    teams
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({loadMatch: Actions.loadMatch}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MatchBody)
