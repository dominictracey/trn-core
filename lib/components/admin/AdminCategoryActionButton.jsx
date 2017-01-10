import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

import { Components, registerComponent, withEdit, withMessages } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const AdminCategoryActionButton = ({ category, createCategory, editMutation, flash }, context) => {
  
  // --- button default values
  const button = {
    title: category ? category.active ? 'De-activate' : 'Activate' : 'Create',
    icon: category ? category.active ? 'pause' : 'play' : 'plus',
  };
  
  // note: `onClick`handler: createCategory fn passed as a prop or a "dumb function" 
  let onClick = createCategory || function() { console.log('Button issue, check how you parametered it.') }; // eslint-disable-line no-console
  
  if (category) {
    
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
    onClick = () => {
      return editMutation(mutationParams)
        .then(result => flash(context.intl.formatMessage({id: 'categories.edit_success'}, {name: category.name}, ), "success"))
        .catch(e => flash(e, "error"));
    };
  }
    
  return <Button title={button.title} className="posts-new-button" bsStyle="primary" onClick={onClick}><Components.Icon name={button.icon} /></Button>;
  
}

AdminCategoryActionButton.displayName = "AdminCategoryActionButton";

AdminCategoryActionButton.contextTypes = {
  intl: intlShape,
}

const options = {
  collection: Categories,
  fragment: Components.AdminPage.rawComponent.fragment,
};

registerComponent('AdminCategoryActionButton', AdminCategoryActionButton, withMessages, withEdit(options));
