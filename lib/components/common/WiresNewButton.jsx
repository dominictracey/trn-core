import { Components, registerComponent, withCurrentUser } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

const WiresNewButton = ({ currentUser, className = "", prefilledProps = {}, location }, context) => {

  const button = <Button bsSize="xsmall" className={className} bsStyle="primary"><Components.Icon name="commenting" /></Button>;
  
  const extendedPrefilledProps = {
    ...prefilledProps,
    location: location.pathname,
  }
  
  return currentUser ? (
    <div className="trn-feedback-button">
      <Components.ModalTrigger size="large" title={context.intl.formatMessage({id: "wires.submit_feedback"})} component={button}>
        <Components.WiresNewForm prefilledProps={extendedPrefilledProps} />
      </Components.ModalTrigger>
    </div>
  ) : null;
  
}

WiresNewButton.displayName = "WiresNewButton";

WiresNewButton.propTypes = {
  currentUser: React.PropTypes.object,
  prefilledProps: React.PropTypes.object,
};

WiresNewButton.contextTypes = {
  intl: intlShape
};

registerComponent('WiresNewButton', WiresNewButton, withCurrentUser, withRouter);
