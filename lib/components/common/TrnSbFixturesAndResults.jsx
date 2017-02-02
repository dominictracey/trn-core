import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSbFixturesAndResults = (props, context) => {
  return (
    <div className='sidebar-card'>
      <div className='sidebar-card-header'>Fixtures & Results</div>
      <div className='sidebar-card-body placeholder'>&nbsp;</div>
    </div>
  );
};


TrnSbFixturesAndResults.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbFixturesAndResults.displayName = "TrnSbFixturesAndResults";

registerComponent('TrnSbFixturesAndResults', TrnSbFixturesAndResults);
