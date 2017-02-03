import React from 'react';
import { withRouter } from 'react-router'
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSidebar = (context) => {

  const currentCategorySlug = context.params.categoryType && context.params.categoryType == "c" ? context.params.categoryType : null;

  const standings = currentCategorySlug ? <Components.TrnStandings context={context} slug={context.params.slug} /> : null

  return (
    <div className='sidebar-container'>
      <Components.TrnSbProfile />
      <Components.TrnSbWelcome />
      <Components.TrnSbFixturesAndResults />
      {standings}
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

registerComponent('TrnSidebar', TrnSidebar, withRouter);
