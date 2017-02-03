import { Components, getRawComponent, replaceComponent } from 'meteor/nova:core';
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import gql from 'graphql-tag';

class TrnPostsItem extends getRawComponent('PostsItem') {

  render() {

    const { post } = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    // match threads are orange
    if (post.postType === 'match') {
      postClass += " match-post-item"
    } else if (post.postType === 'video') {
      postClass += " post-blue"
    }

    const domain = <span className='posts-item-domain'>{Posts.getLinkDomain(post)}</span>

    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Components.Vote document={post} collection={Posts} currentUser={this.props.currentUser} />
        </div>

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.postType === 'match' ? <FormattedMessage id="trn.matchThread"/> : null }{post.title}{domain}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
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
