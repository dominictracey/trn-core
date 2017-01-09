import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

import { Components, registerComponent, withEdit, withMessages } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const AdminCategoryVisibilityButton = ({ category, editMutation, flash }, context) => {
  
  if(!category) {
    return <span>Error defining button</span>;
  }
  
  // --- button default values
  const button = {
    title: category.visible ? 'Hide' : 'Show',
    icon: category.visible ? 'eye-slash' : 'eye',
  };
  
    
  const mutationParams = {
    documentId: category._id,
    set: { 
      name: category.name, // needed even if we don't change it (category type definition)
      visible: !category.visible
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

AdminCategoryVisibilityButton.displayName = "AdminCategoryVisibilityButton";

AdminCategoryVisibilityButton.contextTypes = {
  intl: intlShape,
}

const options = {
  collection: Categories,
  fragment: Components.AdminPage.fragment,
};

registerComponent('AdminCategoryVisibilityButton', AdminCategoryVisibilityButton, withMessages, withEdit(options));