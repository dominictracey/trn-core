import { Components, replaceComponent } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import Categories from "meteor/nova:categories";
import SmartForm from "meteor/nova:forms";

const CategoriesNewFormPrefilled = (props, context) => {
  return (
    <div className="categories-new-form">
      <SmartForm
        collection={Categories}
        queryToUpdate="categoriesListQuery"
        successCallback={category => {
          props.closeCallback();
          props.flash("Category created.", "success");
        }}
        prefilledProps={props.prefilledProps}
      />
    </div>
  );
};

CategoriesNewFormPrefilled.displayName = "CategoriesNewForm";

replaceComponent('CategoriesNewForm', CategoriesNewFormPrefilled);
