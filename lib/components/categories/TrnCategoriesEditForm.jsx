import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Components, replaceComponent, getFragment } from 'meteor/nova:core';
import Categories from "meteor/nova:categories";

const CategoriesEditForm = (props, context) => {

  return (
    <div className="categories-edit-form">
      <Components.SmartForm
        collection={Categories}
        documentId={props.category._id}
        queryFragment={getFragment('CategoriesList')}
        mutationFragment={getFragment('CategoriesList')}
        successCallback={category => {
          props.closeCallback();
          props.flash(context.intl.formatMessage({id: 'categories.edit_success'}, {name: category.name}), "success");
        }}
        removeSuccessCallback={({documentId, documentTitle}) => {
          props.closeCallback();
          props.flash(context.intl.formatMessage({id: 'categories.delete_success'}, {name: documentTitle}), "success");
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
};

replaceComponent('CategoriesEditForm', CategoriesEditForm);
