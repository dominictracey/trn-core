import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ModalTrigger, withList, withCurrentUser, Components, registerComponent, Utils, getFragment } from 'meteor/nova:core';
import Comments from 'meteor/nova:comments';

const TrnPostsCommentsThread = (props, context) => {

  const {loading, terms: { postId }, results, totalCount} = props;

  if (loading) {

    return <div className="posts-comments-thread"><Components.Loading/></div>

  } else {

    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, '_id', 'parentCommentId');

    return (
      <div className="posts-comments-thread">
        {!!props.currentUser ?
          <div className="posts-comments-thread-new">
            <h4><FormattedMessage id="comments.new"/></h4>
            <Components.CommentsNewForm
            postId={postId}
            type="comment"
            />
          </div> :
          <div>
            <ModalTrigger size="small" component={<a><FormattedMessage id="comments.please_log_in"/></a>}>
              <Components.UsersAccountForm/>
            </ModalTrigger>
          </div>
        }
        <Components.CommentsList comments={nestedComments} commentCount={totalCount}/>
      </div>
    );
  }
};

TrnPostsCommentsThread.displayName = "TrnPostsCommentsThread";

TrnPostsCommentsThread.propTypes = {
  currentUser: React.PropTypes.object
};

const options = {
  collection: Comments,
  queryName: 'commentsListQuery',
  fragment: getFragment('CommentsList'),
  limit: 0,
};

registerComponent('PostsCommentsThread', TrnPostsCommentsThread, withList(options), withCurrentUser);
