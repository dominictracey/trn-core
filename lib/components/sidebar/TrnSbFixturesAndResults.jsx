import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

class TrnSbFixturesAndResults extends Component {

  render() {
    return (
        <div className='placeholder'>Fixtures & Results</div>
    )
  }
}


TrnSbFixturesAndResults.propTypes = {
  // post: React.PropTypes.object.isRequired
}

// const mapStateToProps = state => {
//   const { entities } = state
//   const { config, comp } = entities
// 
//   return {
//     config,
//     comp
//   }
// }

TrnSbFixturesAndResults.displayName = "TrnSbFixturesAndResults";

export default /*connect(mapStateToProps)*/(TrnSbFixturesAndResults)
