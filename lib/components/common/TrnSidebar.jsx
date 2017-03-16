import React from 'react';
import { Components, registerComponent, withCurrentUser} from 'meteor/nova:core'

const TrnSidebar = ({slug, categoryType, currentUser, document: category}) => {

  const currentCategorySlug = categoryType && categoryType == "c" ? categoryType : null;
  let fNRComponent

  if(!categoryType && !slug){
    fNRComponent = <Components.FnRPanel category="all"/>
  } else if(categoryType && categoryType == "c"){
    fNRComponent = <Components.FnRPanel category={category}/>
  }
  else {
    fNRComponent = null
  }

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
        // show the fixtures & results on a competition page and main page
        fNRComponent
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
