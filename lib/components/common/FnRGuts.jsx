import React, { Component } from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core'
import { Link } from 'react-router';

import Users from 'meteor/vulcan:users'

const FnRGuts = (props, context) => {
  const { match, teams, component, refPost, currentUser } = props


  if (refPost == null) {
    if (Users.canDo(currentUser, 'posts.new.match')) {
      return <Components.FnRNewPost {...props} />
    }
    else {
      return <div className="FnR-match-guts"><div className="FnR-match-generated"><div className="FnR-noLink">{component}</div></div></div>
    }
  } else {
    return <div className="FnR-match-guts"><div className="FnR-match-generated"><div className="FnR-link"><Link to={`x/${refPost.slug}`}>{component}</Link></div></div></div>
  }

}

registerComponent('FnRGuts', FnRGuts, withCurrentUser)
