import React from 'react';
import { withRouter } from 'react-router'
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSidebar = (context) => {
  //
  const currentCategorySlug = context.params.categoryType && context.params.categoryType == "c" ? context.params.categoryType : null;
  const standings = currentCategorySlug ? <Components.TrnStandings context={context}/> : null
  const profile = false ? <Components.TrnSbProfile /> : null
  const fixturesAndResults = false ? <Components.TrnSbFixturesAndResults /> : null
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

registerComponent('TrnSidebar', TrnSidebar, withRouter);
