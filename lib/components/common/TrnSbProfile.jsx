import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSbProfile = (props, context) => {
  return (
    <div className='sidebar-card'>
      <div className='sidebar-card-header'>
        <span>Profile</span>
        <Components.WiresNewButton
          prefilledProps={{context: "profile sidebar"}}
        />
      </div>
      <div className='sidebar-card-body placeholder'>&nbsp;</div>
    </div>
  );
};


TrnSbProfile.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbProfile.displayName = "TrnSbProfile";

registerComponent('TrnSbProfile', TrnSbProfile);
