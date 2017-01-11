import { withRouter } from 'react-router';
import gql from 'graphql-tag';

import { Components, getRawComponent, registerComponent, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

// get the original list
const originalComponent = getRawComponent('CategoriesList');

// create a new fragment
const newFragment = gql`
  fragment visibleCategoriesListFragment on Category {
    _id
    name
    description
    order
    slug
    image
    type
    active
    visible
    trnId
    abbr
  }
`;

const categoriesListOptions = {
  collection: Categories,
  queryName: 'visibleCategoriesListQuery',
  fragment: newFragment,
  limit: 0,
  terms: {onlyVisible: true}, // see callbacks.js -> 'categories.parameters'
};

registerComponent('CategoriesList', originalComponent, withRouter, withList(categoriesListOptions));
