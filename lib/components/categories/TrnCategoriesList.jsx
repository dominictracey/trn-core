import React from 'react';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { Nav } from 'react-bootstrap';
import { Components, getRawComponent, registerComponent, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const TrnCategoriesList = ({ results: categories, router, typeFilter }, context) => {
  
  const currentQuery = _.clone(router.location.query);
  delete currentQuery.cat;
  
  // categories may be filtered by type
  if (typeFilter) {
    categories = categories.filter(cat => cat.type === typeFilter);
  }
  
  // add "Home" as a fake category at the beginning of the list
  categories.unshift({
    _id: 1, // placeholder
    name: 'Home',
  });

  return (
    <Nav className="categories-list">
      {categories && categories.length > 0 ? categories.map((category, index) => <Components.Category key={index} category={category} index={index}/>) : null}
    </Nav>
  );

}

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

const categoriesListOptions = {
  collection: Categories,
  queryName: 'visibleCategoriesListQuery',
  fragment: newFragment,
  limit: 0,
  terms: {onlyVisible: true}, // see callbacks.js -> 'categories.parameters'
};

registerComponent('CategoriesList', TrnCategoriesList, withRouter, withList(categoriesListOptions));
