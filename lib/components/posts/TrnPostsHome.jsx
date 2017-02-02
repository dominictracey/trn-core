import { Components, replaceComponent } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';

const TrnPostsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'top'}: props.location.query;
  
  if (props.params.categoryType && props.params.slug) {
    terms.cat = props.params.slug;
  }
  
  return <Components.PostsList terms={terms}/>
};

TrnPostsHome.displayName = "TrnPostsHome";

replaceComponent('PostsHome', TrnPostsHome);
