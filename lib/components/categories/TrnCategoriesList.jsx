import React from 'react';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Components, getRawComponent, registerComponent, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const TrnCategoriesList = ({ results: categories, router, typeFilter }, context) => {
  
  const currentCategorySlug = router.location.query.cat;
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
  
  // note (jan 13rd 2017): when having twice the same query, if you update the list, you duplicate the result for the client...
  return router.location.pathname !== '/admin' ? (
    <Nav className="categories-list">
      {categories && categories.length ? categories.map((category, index) => (
        <LinkContainer className="category-list-item" key={index} to={{pathname:"/", query: {...currentQuery, cat: category.slug}}}>
          <NavItem>
            {currentCategorySlug && currentCategorySlug === category.slug ? <Components.Icon name="voted"/> :  null}
            {category.name}
          </NavItem>
        </LinkContainer>
      )) : null}
    </Nav>
  ) : null;

}

// create a new fragment
TrnCategoriesList.fragment = gql`
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
  fragment: TrnCategoriesList.fragment,
  limit: 0,
  terms: {onlyVisible: true}, // see callbacks.js -> 'categories.parameters'
};

registerComponent('CategoriesList', TrnCategoriesList, withRouter, withList(categoriesListOptions));
