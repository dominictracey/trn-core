import React from 'react';
import { withRouter } from 'react-router'
import { Components, registerComponent, withCurrentUser } from 'meteor/nova:core';

const TrnSidebar = (props) => {

  const currentCategorySlug = props.params.categoryType && props.params.categoryType === "c" ? props.params.slug : null;

  return (
    <div className='sidebar-container'>
      {
        // show profile sidebar is a user is connected
        props.currentUser
        ? <Components.TrnSbProfile documentId={props.currentUser._id} />
        : null
      }
      
      <Components.TrnSbWelcome />
      
      {
        // show the fixtures & results on a competition page
        currentCategorySlug 
        ? <Components.TrnSbFixturesAndResults catType={props.params.categoryType} slug={currentCategorySlug} />
        : null
      }
      
      {
        // show the fixtures & results on a competition page
        currentCategorySlug 
        ? <Components.TrnStandings props={props} slug={currentCategorySlug} /> 
        : null
      }
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

registerComponent('TrnSidebar', TrnSidebar, withRouter, withCurrentUser);
