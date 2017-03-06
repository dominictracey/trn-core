import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router'
import {ModalTrigger, Components, replaceComponent, Utils} from 'meteor/nova:core';

const TrnPostsCommentsThread = (props, context) => {

	const {loading, terms: {postId}, results, totalCount} = props;

	if (loading) {

		return <div className="posts-comments-thread"><Components.Loading/></div>

	} else {

		const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
		const nestedComments = Utils.unflatten(resultsClone, '_id', 'parentCommentId');

		const markDownModal = <div className="commentHelp-link"><Link><FormattedMessage id="commentHelp.title"/></Link>
		</div>

		return (
			<div className="posts-comments-thread">
				<span>
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
					<Components.ModalTrigger
						size={'large'}
						component={markDownModal}
					>
					<Components.CommentHelpModal />
				</Components.ModalTrigger>
				</span>
				<Components.CommentsList comments={nestedComments} commentCount={totalCount}/>
			</div>
		);
	}
};

TrnPostsCommentsThread.displayName = "TrnPostsCommentsThread";

TrnPostsCommentsThread.propTypes = {
	currentUser: React.PropTypes.object
};

replaceComponent('PostsCommentsThread', TrnPostsCommentsThread);
