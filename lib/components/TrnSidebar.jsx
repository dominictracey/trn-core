import React from 'react';
import { withRouter } from 'react-router'
import TrnSbProfile from './sidebar/TrnSbProfile'
import TrnSbFixturesAndResults from './sidebar/TrnSbFixturesAndResults'

const TrnSidebar = () => {
  //
  // const currentCategorySlug = router.location.query.cat;
  // const newQuery = _.clone(router.location.query);
  // newQuery.cat = category.slug;
  return (
    <div>
      <TrnSbProfile />
      <TrnSbFixturesAndResults />
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

module.exports = withRouter(TrnSidebar);
export default withRouter(TrnSidebar);
