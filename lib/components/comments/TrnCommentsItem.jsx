import { Components, replaceComponent, getRawComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { intlShape, FormattedMessage, FormattedRelative } from 'react-intl';
import Comments from 'meteor/vulcan:comments';

class TrnCommentsItem extends getRawComponent('CommentsItem') {

  render() {
    const { comment } = this.props;

    return (
      <div className="comments-item" id={comment._id}>
        <div className="comments-item-body">
          <div className="comments-item-meta">
            <div className="comments-item-vote">
              <Components.Vote collection={Comments} document={this.props.comment} currentUser={this.props.currentUser}/>
            </div>
            <Components.UsersAvatar size="small" user={comment.user}/>
            <Components.UsersName user={comment.user}/>
            <div className="comments-item-date"><FormattedRelative value={comment.postedAt}/></div>
            <Components.ShowIf check={Comments.options.mutations.edit.check} document={this.props.comment}>
              <div>
                <a className="comment-edit" onClick={this.showEdit}><FormattedMessage id="comments.edit"/></a>
              </div>
            </Components.ShowIf>
            <Components.WiresNewButton prefilledProps={{context: `comment on post ${comment.postId}`}} />
          </div>
          {this.state.showEdit ? this.renderEdit() : this.renderComment()}
        </div>
        {this.state.showReply ? this.renderReply() : null}
      </div>
    )
  }

}

TrnCommentsItem.propTypes = {
  comment: React.PropTypes.object.isRequired, // the current comment
  currentUser: React.PropTypes.object,
};

TrnCommentsItem.contextTypes = {
  intl: intlShape
};

replaceComponent('CommentsItem', TrnCommentsItem);
