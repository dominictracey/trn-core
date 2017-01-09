import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

export class TeamStatsPanel extends Component {

  componentDidMount() {

  }

  render() {
    const { matchId, teamSelector } = this.props


    return (
      <div>
      {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
      </div>
    )
  }
}

 TeamStatsPanel.propTypes = {
  matchId: React.PropTypes.object,
  teamSelector: React.PropTypes.object,
}

const mapStateToProps = ({entities: { teamMatchStatsByMatchId, teamMatchStats }}) => ({teamMatchStatsByMatchId, teamMatchStats})
//const mapDispatchToProps = dispatch => bindActionCreators({loadConfiguration: Actions.loadConfiguration}, dispatch);

export default connect(mapStateToProps)(TeamStatsPanel)
