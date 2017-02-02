import React from 'react';
import { withRouter } from 'react-router'
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSidebar = (context) => {
  //
  const currentCategorySlug = context.params.categoryType && context.params.categoryType == "c" ? context.params.categoryType : null;
  // const newQuery = _.clone(router.location.query);
  // newQuery.cat = category.slug;
  const standings = currentCategorySlug ? <Components.TrnStandings context={context}/> : null

  return (
    <div className='sidebar-container'>
      <Components.TrnSbProfile />
      <Components.TrnSbFixturesAndResults />
      {standings}
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

registerComponent('TrnSidebar', TrnSidebar, withRouter);
