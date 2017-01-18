import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Components, registerComponent, getRawComponent } from 'meteor/nova:lib';

import Categories from "meteor/nova:categories";
import { withMessages } from 'meteor/nova:core';
import gql from 'graphql-tag';

const fragment = gql`
  fragment trnCategoriesEditForm on Category {
    _id
name
description
order
slug
image
type
visible
trnId
abbr
    attachedTeams {
      _id
name
description
order
slug
image
type
visible
trnId
abbr
    }
  }
`;

const CategoriesEditForm = (props, context) => {

  return (
    <div className="categories-edit-form">
      <Components.SmartForm
        collection={Categories}
        documentId={props.category._id}
        queryFragment={fragment}
        mutationFragment={fragment}
        successCallback={category => {
          props.closeCallback();
          props.flash(context.intl.formatMessage({id: 'categories.edit_success'}, {name: category.name}), "success");
        }}
        removeSuccessCallback={({documentId, documentTitle}) => {
          props.closeCallback();
          props.flash(context.intl.formatMessage({id: 'categories.delete_success'}, {name: documentTitle}), "success");
          // context.events.track("category deleted", {_id: documentId});
        }}
        showRemove={true}
      />
    </div>
  )

};

CategoriesEditForm.propTypes = {
  category: React.PropTypes.object.isRequired,
  closeCallback: React.PropTypes.func,
  flash: React.PropTypes.func,
}

CategoriesEditForm.contextTypes = {
  intl: intlShape,
  // events: React.PropTypes.object,
};

registerComponent('CategoriesEditForm', CategoriesEditForm, withMessages);
