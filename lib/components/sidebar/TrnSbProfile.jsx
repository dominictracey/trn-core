import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

class TrnSbProfile extends Component {

  render() {
    return (
        <div className='placeholder post-green'>Profile</div>
    )
  }
}


TrnSbProfile.propTypes = {
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

TrnSbProfile.displayName = "TrnSbProfile";

export default /*connect(mapStateToProps)*/(TrnSbProfile)
