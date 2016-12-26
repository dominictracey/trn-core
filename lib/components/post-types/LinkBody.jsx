import React, { Component, PropTypes } from 'react'

export class LinkBody extends Component {

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

export default LinkBody
