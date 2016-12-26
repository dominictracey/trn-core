import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';


// import { Button } from 'react-bootstrap';
// import moment from 'moment';
// import { ModalTrigger } from "meteor/nova:core";
// import Categories from "meteor/nova:categories";

class TrnPostsItem extends Telescope.components.PostsItem {



  render() {

    const { post } = this.props

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    // match threads are orange
    if (post.postType === 'match') {
      postClass += " post-orange"
    } else if (post.postType === 'video') {
      postClass += " post-blue"
    }

    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Telescope.components.Vote post={post} />
        </div>

        {post.thumbnailUrl ? <Telescope.components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={Posts.getPageUrl(post)} className="posts-item-title-link">
              {post.postType === 'match' ? <FormattedMessage id="trn.matchThread"/> : null }{post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Telescope.components.UsersAvatar user={post.user} size="small"/><Telescope.components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
            {this.context.currentUser && this.context.currentUser.isAdmin ? <Telescope.components.PostsStats post={post} /> : null}
            {this.renderActions()}
          </div>

        </div>

        {this.renderCommenters()}


      </div>
    )

  }
}

TrnPostsItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

TrnPostsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default TrnPostsItem
