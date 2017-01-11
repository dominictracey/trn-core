import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

import { Components, registerComponent, withMessages } from 'meteor/nova:core';

const CategoriesCompetitionsNewButton = ({ category, createCategory, flash }, context) => {
  
  // --- button default values
  const button = {
    title: 'Create',
    icon: 'plus',
  };
    
  return <Button title={button.title} className="posts-new-button" bsStyle="primary" onClick={createCategory}><Components.Icon name={button.icon} /></Button>;
  
}

CategoriesCompetitionsNewButton.displayName = "CategoriesCompetitionsNewButton";

CategoriesCompetitionsNewButton.contextTypes = {
  intl: intlShape,
}

registerComponent('CategoriesCompetitionsNewButton', CategoriesCompetitionsNewButton, withMessages);
