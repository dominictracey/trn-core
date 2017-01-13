import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSbProfile = (props, context) => {
  return (
    <div className='placeholder post-green'>Profile</div>
  );
};


TrnSbProfile.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbProfile.displayName = "TrnSbProfile";

registerComponent('TrnSbProfile', TrnSbProfile);
