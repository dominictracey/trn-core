import React, { Component, PropTypes } from 'react'
import { registerComponent, Components } from 'meteor/vulcan:core';

class PostsRatingBody extends Component {

  render() {
    const { post } = this.props


    const htmlBody = {__html: post.htmlBody}
    return (
      <div>
        {<div className="posts-page-ratings">Match Ratings!</div>}
        {post.htmlBody && <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div>}
      </div>
    )
  }
}

registerComponent('PostsRatingBody', PostsRatingBody);
