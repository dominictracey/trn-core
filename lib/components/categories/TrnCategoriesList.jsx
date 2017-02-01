import React from 'react';
import gql from 'graphql-tag';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Components, getRawComponent, registerComponent, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const TrnCategoriesList = ({ loading, results: categories = [], router, typeFilter }, context) => {
  
  const currentCategorySlug = router.params.categoryType && router.params.slug;
  
  // categories may be filtered by type
  if (typeFilter) {
    categories = categories.filter(cat => typeFilter.includes(cat.type));
  }
  
  // add "Home" as a fake category at the beginning of the list
  categories.unshift({
    _id: 1, // placeholder
    name: 'Home',
  });
  
  return (
    <Nav className="categories-list">
      {
        categories && categories.length ? categories.map((category, index) => {
          
          // index route that should redirect to /
          const pathname = category._id !== 1 ? Categories.getUrl(category) : '/';
          
          return (
            <LinkContainer 
              className="category-list-item" 
              key={index} 
              to={{pathname}}
            >
              <NavItem>
                {currentCategorySlug && currentCategorySlug === category.slug ? <Components.Icon name="voted"/> :  null}
                {category.name}
              </NavItem>
            </LinkContainer>
          )
        }) : null
      }
    </Nav>
  );

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
};

registerComponent('CategoriesList', TrnCategoriesList, withList(categoriesListOptions));
