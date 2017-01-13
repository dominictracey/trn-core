import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSbFixturesAndResults = (props, context) => {
  return (
    <div className='placeholder'>Fixtures & Results</div>
  );
};


TrnSbFixturesAndResults.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbFixturesAndResults.displayName = "TrnSbFixturesAndResults";

registerComponent('TrnSbFixturesAndResults', TrnSbFixturesAndResults);
