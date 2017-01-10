import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

import { Components, getRawComponent, registerComponent, withEdit, withMessages } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const CategoriesCompetitionsActivityButton = ({category, editMutation, flash}, context) => {
  
  if (!category || category.type !== 'comp') {
    return <div>Error defining button</div>
  }
  
  // --- button default values
  const button = {
    title: category.active ? 'De-activate' : 'Activate',
    icon: category.active ? 'pause' : 'play',
  };
  
  const mutationParams = {
    documentId: category._id,
    set: { 
      name: category.name, // needed even if we don't change it (category type definition)
      active: !category.active,
      type: 'comp',
    },
    unset: {}, // needed even if we don't "unset" anything (mutation utils process)
  };
  
  // trigger the mutation with the params written above and display a success/error message
  const onClick = () => {
    return editMutation(mutationParams)
      .then(result => flash(context.intl.formatMessage({id: 'categories.edit_success'}, {name: category.name}, ), "success"))
      .catch(e => flash(e, "error"));
  };
    
  return <Button title={button.title} className="posts-new-button" bsStyle="primary" onClick={onClick}><Components.Icon name={button.icon} /></Button>;
  
}

CategoriesCompetitionsActivityButton.displayName = "CategoriesCompetitionsActivityButton";

CategoriesCompetitionsActivityButton.contextTypes = {
  intl: intlShape,
}

const options = {
  collection: Categories,
  fragment: getRawComponent('AdminPage').fragment,
};

registerComponent('CategoriesCompetitionsActivityButton', CategoriesCompetitionsActivityButton, withMessages, withEdit(options));
