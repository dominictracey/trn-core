import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import { Components, registerComponent } from 'meteor/nova:core'

const FnRNewPost = (props) => {
  const { match, teams, component } = props

  return (
    <div className="FnR-match-guts">
      <div className="FnR-match-generated">
        <Components.ModalTrigger
          size="large"
          title={
            <div>
              <FormattedMessage id="posts.new_post"/>
              <Components.WiresNewButton prefilledProps={{context: `new post form`}}/>
            </div>
          }
          component={<div className="FnR-link"><Link>{component}</Link></div>}
      >
          <Components.PostsNewForm trnId={match.id} teams={teams} title={match.displayName}/>
        </Components.ModalTrigger>
      </div>
    </div>
  )

}

registerComponent('FnRNewPost', FnRNewPost)
