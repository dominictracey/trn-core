import React from 'react';
import { withRouter } from 'react-router'
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSidebar = () => {
  //
  // const currentCategorySlug = router.location.query.cat;
  // const newQuery = _.clone(router.location.query);
  // newQuery.cat = category.slug;
  return (
    <div>
      <Components.TrnSbProfile />
      <Components.TrnSbFixturesAndResults />
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

registerComponent('TrnSidebar', TrnSidebar, withRouter);
