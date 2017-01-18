import React from 'react';
import { withRouter } from 'react-router';
import { getSetting, Components, replaceComponent } from 'meteor/nova:core';

const TrnHeader = (props, context) => {
  
  const logoUrl = getSetting("logoUrl");
  const siteTitle = getSetting("title", "Nova");
  const tagline = getSetting("tagline");

  return (
    <div className="header-wrapper">

      <header className="header-primary">

        <div className="logo">
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>
        
        <div className="nav">
          
          <div className="nav-user">
            {!!props.currentUser ? <Components.UsersMenu/> : <Components.UsersAccountMenu/>}
          </div>

          <div className="nav-new-post">
            <Components.PostsNewButton/>
          </div>

        </div>

      </header>
      
      <div className="header-secondary">
      {
        // note (jan 13rd 2017): when having twice the same query, if you update the list, you duplicate the result for the client...
        props.router.location.pathname !== '/admin' ?  <Components.CategoriesList typeFilter={['comp', 'normal']} router={props.router} terms={{onlyVisible: true}} /> : null
      }
      </div>
    </div>
  )
}

TrnHeader.displayName = "TrnHeader";

TrnHeader.propTypes = {
  currentUser: React.PropTypes.object,
};

replaceComponent('Header', TrnHeader, withRouter);
