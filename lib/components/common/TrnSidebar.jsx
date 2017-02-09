import React from 'react';
import { withRouter } from 'react-router'
import { Components, registerComponent } from 'meteor/nova:core';

const TrnSidebar = (props) => {

  const currentCategorySlug = props.params.categoryType && props.params.categoryType == "c" ? props.params.categoryType : null;
  const standings = currentCategorySlug ? <Components.TrnStandings props={props} slug={props.params.slug} /> : null
  const profile = /*false ? <Components.TrnSbProfile /> :*/ null
  const fixturesAndResults = props.params ? <Components.TrnSbFixturesAndResults catType={props.params.categoryType} slug={props.params.slug} /> : null

  return (
    <div className='sidebar-container'>
      {profile}
      <Components.TrnSbWelcome />
      {fixturesAndResults}
      {/* {standings} */}
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

registerComponent('TrnSidebar', TrnSidebar, withRouter);
