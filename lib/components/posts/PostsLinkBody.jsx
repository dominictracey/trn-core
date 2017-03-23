import React, { Component, PropTypes } from 'react'
import { registerComponent, Components } from 'meteor/vulcan:core';

class PostsLinkBody extends Component {

  render() {
    const { post } = this.props

    const htmlBody = {__html: post.htmlBody}
    return (
      <div>
        {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
      </div>
    )
  }
}

registerComponent('PostsLinkBody', PostsLinkBody);
