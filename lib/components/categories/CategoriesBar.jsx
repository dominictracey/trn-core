import React from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { Components, registerComponent, getRawComponent, withDocument } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const CategoriesBar = ({loading, document: category}, context) => {

  return loading || !category ? <Components.Loading /> : (
    <div className="category-bar">
      <div className="category-bar-content">
        {category.abbr ? <img src={Categories.getLogo(category)} title={category.name} className="category-bar-thumbnail" /> : null}
        <h3>{category.name}</h3>
      </div>
      {category.type === 'comp' && category.attachedTeams && category.attachedTeams.length ? <div className="category-bar-teams-wrapper">
        {
          category.attachedTeams.map((team, index) => { 
            
            const pathname = Categories.getUrl(team);
            const logo = Categories.getLogo(team);
            
            return team.abbr 
              ? (<Link 
                key={index} 
                to={{pathname}}>
                  <img src={logo} title={team.name} className="category-bar-teams-item" />
               </Link>) 
               : null;
          })
        }
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
