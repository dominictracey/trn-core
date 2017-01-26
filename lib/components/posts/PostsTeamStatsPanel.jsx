import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Components, registerComponent } from 'meteor/nova:core';

class PostsTeamStatsPanel extends Component {

  componentDidMount() {

  }

  render() {
    const { matchId, teamSelector, teamMatchStatsByMatchId, teamMatchStats } = this.props

    return (
      <div>
      {teamMatchStatsByMatchId[matchId] ? teamMatchStats[teamMatchStatsByMatchId[matchId]].tmsList[teamSelector] : null}
      </div>
    );
  }
}

PostsTeamStatsPanel.propTypes = {
  matchId: React.PropTypes.object,
  teamSelector: React.PropTypes.object,
};

const mapStateToProps = ({entities: { teamMatchStatsByMatchId, teamMatchStats }}) => ({teamMatchStatsByMatchId, teamMatchStats});
//const mapDispatchToProps = dispatch => bindActionCreators({loadConfiguration: getActions().loadConfiguration}, dispatch);

registerComponent('PostsTeamStatsPanel', PostsTeamStatsPanel, connect(mapStateToProps));
