import React from 'react';
import { Link } from 'react-router';
import { Components, registerComponent, getFragment, withDocument, getSetting } from 'meteor/vulcan:core';
import Categories from 'meteor/vulcan:categories';

const CategoriesBar = ({loading, document: category}) => {

  return loading || !category ? <Components.Loading /> : (
    <div className="category-bar">
      {category.abbr ?
        <Components.HeadTags url={Categories.getUrl(category, true)} title={category.name + " on The Rugby Net"} image={Categories.getLogo(category)} description={"The latest news, results and banter from " + category.name + " on The Rugby Net."} />
        : <Components.HeadTags url={Categories.getUrl(category, true)} title={category.name + " on The Rugby Net"} image={getSetting("siteImage")} description={"The latest news, results and banter in The Rugby Net's " + category.name + " section."} /> }

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

const options = {
  collection: Categories,
  queryName: 'categoriesSingleQuery',
  fragment: getFragment('CategoriesList'),
};

registerComponent('CategoriesBar', CategoriesBar, withDocument(options));
