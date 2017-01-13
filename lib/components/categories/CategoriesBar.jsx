import React from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { Components, registerComponent, getRawComponent, withDocument } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const CategoriesBar = ({loading, document: category}, context) => {

  return loading || !category ? <Components.Loading /> : (
    <div className="category-bar">
      <div className="category-bar-content">
        {category.image ? <img src={category.image} title={category.name} className="category-bar-thumbnail" /> : null}
        <h3>{category.name}</h3>
      </div>
      {category.type === 'comp' && category.attachedTeams && category.attachedTeams.length ? <div className="category-bar-teams-wrapper">
        {
          // note: for now just take a maximum of 4 teams to display
          _.take(category.attachedTeams, 4).map((team, index) => team.image 
          ? (<Link 
              key={index} 
              to={{pathname:'/', query: {cat: team.slug}}}>
                <img src={team.image} title={team.name} className="category-bar-teams-item" />
             </Link>) : null)}
      </div>: null}
        
      
    </div>
  );
};

CategoriesBar.fragment = gql`
  fragment barFragment on Category {
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

const options = {
  collection: Categories,
  queryName: 'categoriesSingleQuery',
  fragment: CategoriesBar.fragment,
};

registerComponent('CategoriesBar', CategoriesBar, withDocument(options));
