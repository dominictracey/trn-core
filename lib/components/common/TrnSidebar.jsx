import React from 'react';
import { Components, registerComponent, withCurrentUser} from 'meteor/nova:core'

const TrnSidebar = ({slug, categoryType, currentUser, document: category}) => {

  const currentCategorySlug = categoryType && categoryType == "c" ? categoryType : null;

  return (
    <div className='sidebar-container'>
      {
        // show profile sidebar is a user is connected
        currentUser
        ? <Components.TrnSbProfile currentUser={currentUser} userId={currentUser._id} />
        : null
      }

      <Components.TrnSbWelcome />

      {
        // show the fixtures & results on a competition page
        currentCategorySlug
        ? <Components.TrnSbFixturesAndResults category={category}/>
        : null
      }

      {
        // show the fixtures & results on a competition page
        currentCategorySlug
        ? <Components.TrnStandings category={category} />
        : null
      }
    </div>
  )
}

TrnSidebar.displayName = "TrnSidebar";

registerComponent('TrnSidebar', TrnSidebar, withCurrentUser);
