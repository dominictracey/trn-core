import React from 'react';
import { Components, registerComponent, withDocument, getFragment} from 'meteor/nova:core'
import Categories from 'meteor/nova:categories'

const TrnSidebar = ({slug, categoryType, document: category}) => {

  const currentCategorySlug = categoryType && categoryType == "c" ? categoryType : null;
  const standings = currentCategorySlug ? <Components.TrnStandings category={category}/> : null
  const profile = /*false ? <Components.TrnSbProfile /> :*/ null
  const fixturesAndResults = categoryType ? <Components.TrnSbFixturesAndResults category={category}/> : null

  return (
    <div className='sidebar-container'>
      {profile}
      <Components.TrnSbWelcome />
      {fixturesAndResults}
      {standings}
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";
const options = {
	collection: Categories,
	queryName: 'categoriesSingleQuerySidebar',
	fragment: getFragment('CategoriesList'),
};
//registerComponent('TrnSidebar', TrnSidebar, withRouter, withDocument(options));
registerComponent('TrnSidebar', TrnSidebar, withDocument(options));
