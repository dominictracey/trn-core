import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

import { Components, registerComponent, withEdit, withMessages } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const AdminCategoryActionButton = ({ category, trnId, createCategory, editMutation, flash }, context) => {
  
  // --- default values (let)
  let label = 'Create';
  // note: `onClick`handler: createCategory fn passed as a prop or a "dumb function" 
  let onClick = createCategory || function() { console.log('Button issue, check how you parametered it.') }; // eslint-disable-line no-console
  
  if (category) {
    label = category.active ? 'Hide' : 'Activate';
    
    const mutationParams = {
      documentId: category._id,
      set: { 
        name: category.name, // needed even if we don't change it (category type definition)
        active: !category.active
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
    
  return <Button className="posts-new-button" bsStyle="primary" onClick={onClick}>{label}</Button>;
  
}

AdminCategoryActionButton.displayName = "AdminCategoryActionButton";

AdminCategoryActionButton.contextTypes = {
  intl: intlShape,
}

const options = {
  collection: Categories,
  fragment: Components.AdminPage.fragment,
};

registerComponent('AdminCategoryActionButton', AdminCategoryActionButton, withMessages, withEdit(options));
