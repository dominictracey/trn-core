import { Components, getRawComponent, replaceComponent } from 'meteor/vulcan:core';
import Posts from "meteor/vulcan:posts";
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';

class TrnPostsItem extends getRawComponent('PostsItem') {

  render() {

    const { post } = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    // match threads are orange
    if (post.postType === 'match') {
      postClass += " match-post-item"
    } else if (post.postType === 'video') {
      postClass += " video-post-item"
    }

    const domain = <span className='posts-item-domain'>{Posts.getLinkDomain(post)}</span>
    const local = post.postType !== 'match' && post.postType !== 'video'

    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Components.Vote document={post} collection={Posts} currentUser={this.props.currentUser} />
        </div>

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={Posts.getLink(post, false, local)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.postType === 'match' ? <FormattedMessage id="trn.matchThread"/> : null }{post.title}{domain}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            <span className="posts-item-date">
              Submitted by {post.user? <Components.UsersName user={post.user}/> : null} <FormattedRelative value={post.postedAt}/>
            </span>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
            <Components.WiresNewButton prefilledProps={{context: `post item ${post.title} (id: ${post._id})`}} />
          </div>

        </div>

        {this.renderCommenters()}


      </div>
    )

  }
}

TrnPostsItem.propTypes = {
  post: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object,
}

replaceComponent('PostsItem', TrnPostsItem)
