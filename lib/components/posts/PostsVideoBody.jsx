import React, { Component, PropTypes } from 'react'
import { registerComponent, Components } from 'meteor/nova:core';

class PostsVideoBody extends Component {

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

registerComponent('PostsVideoBody', PostsVideoBody);
