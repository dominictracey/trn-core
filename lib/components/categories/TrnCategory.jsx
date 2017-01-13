import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Components, replaceComponent } from 'meteor/nova:core';

const TrnCategory = ({category, index, router}, context) => {

  const currentCategorySlug = router.location.query.cat;
  const newQuery = _.clone(router.location.query);
  newQuery.cat = category.slug;

  return (
    <div className="category-list-item">
      <LinkContainer to={{pathname:"/", query: newQuery}}>
        <NavItem
          eventKey={index+1}
          key={category._id}
        >
          {currentCategorySlug && currentCategorySlug === category.slug ? <Components.Icon name="voted"/> :  null}
          {category.name}
        </NavItem>
      </LinkContainer>
    </div>
  );
}

TrnCategory.propTypes = {
  category: React.PropTypes.object,
  index: React.PropTypes.number,
  currentCategorySlug: React.PropTypes.string,
  openModal: React.PropTypes.func
}

replaceComponent('Category', TrnCategory)
