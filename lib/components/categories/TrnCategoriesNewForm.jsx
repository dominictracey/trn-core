import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { Components, replaceComponent } from 'meteor/nova:core';
import Categories from "meteor/nova:categories";
import SmartForm from "meteor/nova:forms";

const CategoriesNewFormPrefilled = (props, context) => {
  return (
    <div className="categories-new-form">
      <SmartForm
        collection={Categories}
        successCallback={category => {
          props.closeCallback();
          props.flash(context.intl.formatMessage({id: 'categories.new_success'}, {name: category.name}), "success");
        }}
        prefilledProps={props.prefilledProps}
      />
    </div>
  );
};

CategoriesNewFormPrefilled.displayName = "CategoriesNewForm";


CategoriesNewFormPrefilled.propTypes = {
  closeCallback: React.PropTypes.func,
  flash: React.PropTypes.func,
  prefilledProps: React.PropTypes.object,
};

CategoriesNewFormPrefilled.contextTypes = {
  intl: intlShape,
};


replaceComponent('CategoriesNewForm', CategoriesNewFormPrefilled);
