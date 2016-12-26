import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

export class CompList extends Component {
  render() {
    const { config, fetchComp } = this.props
    if (!config || _.isEmpty(config)) {
      return (<div></div>)
    }
    return (
      <div>
        {config.compsForClient.map(compId =>
          <span key={compId}>{config.competitionMap[compId]} </span>
        )}
      <a onClick={fetchComp}>Load Comp</a>
      </div>
    )
  }
}

CompList.propTypes = {
  config: React.PropTypes.object.isRequired,
  fetchComp: React.PropTypes.func.isRequired,
}

export default CompList
