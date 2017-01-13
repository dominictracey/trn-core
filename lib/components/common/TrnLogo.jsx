import { replaceComponent } from 'meteor/nova:core';
import React from 'react';
import { IndexLink } from 'react-router';
import Users from 'meteor/nova:users';

const TrnLogo = ({logoUrl, siteTitle, currentUser}) => {
  if (logoUrl) {
    return (
      <h1 className="logo-image ">
        <IndexLink to={{pathname: "/"}}>
          <img src={logoUrl} alt={siteTitle} style={{maxWidth: "300px", maxHeight: "36px"}} />
        </IndexLink>
      </h1>
    )
  } else {
    return (
      <h1 className="logo-text">
        <IndexLink to={{pathname: "/"}}>{siteTitle}</IndexLink>
      </h1>
    )
  }

}

replaceComponent('Logo', TrnLogo);
