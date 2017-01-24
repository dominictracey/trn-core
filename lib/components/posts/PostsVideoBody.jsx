import React, { Component, PropTypes } from 'react'
import { registerComponent, Components } from 'meteor/nova:core';

class PostsVideoBody extends Component {

  render() {
    const { post } = this.props

    const htmlMedia = {__html: post.media && post.media.html}
    const htmlBody = {__html: post.htmlBody}
    return (
      <div>
        {post.media && post.media.html && <div className="posts-page-media" dangerouslySetInnerHTML={htmlMedia}></div>}
        {post.htmlBody && <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div>}
      </div>
    )
  }
}

registerComponent('PostsVideoBody', PostsVideoBody);
