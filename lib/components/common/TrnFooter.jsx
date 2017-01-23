import { registerComponent } from 'meteor/nova:lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const TrnFooter = props => {
  return (

    <div className="footer"><span>Copyright 2017 The Rugby Net, Inc. | </span><a href="http://telescopeapp.org" target="_blank"><FormattedMessage id="app.powered_by"/></a></div>
  )
}

TrnFooter.displayName = "Footer";

registerComponent('Footer', TrnFooter);
