import { Components, replaceComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Posts from "meteor/vulcan:posts";

const TrnPostsNewButton = (props, context) => {

  // button disabled if not on the homepage or on a category route
  const allowedToPost = props.router.location.pathname === '/' || props.router.params.categoryType && props.router.params.slug;

  const size = props.currentUser ? "large" : "small";
  const button = <Button className="posts-new-button" bsStyle="primary" disabled={!allowedToPost}><FormattedMessage id="posts.new_post"/></Button>;

  return !allowedToPost ? button : (
    <Components.ModalTrigger
      size={size}
      title={
        <div>
          <FormattedMessage id="posts.new_post" />
          <Components.WiresNewButton prefilledProps={{context: `new post form`}} />
        </div>
      }
      component={button}
    >
      <Components.PostsNewForm />
    </Components.ModalTrigger>
  )
}

TrnPostsNewButton.displayName = "TrnPostsNewButton";

TrnPostsNewButton.propTypes = {
  currentUser: React.PropTypes.object,
};

TrnPostsNewButton.contextTypes = {
  messages: React.PropTypes.object,
  intl: intlShape
};

replaceComponent('PostsNewButton', TrnPostsNewButton, withRouter);
