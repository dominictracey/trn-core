import { registerFragment, getFragment } from 'meteor/nova:lib';
import gql from 'graphql-tag';

const TrnUsersMinimumInfoFragment = gql`
  fragment TrnUsersMinimumInfo on User {
    ...UsersMinimumInfo
    avatar
  }
  ${getFragment('UsersMinimumInfo')}
`;

registerFragment(TrnUsersMinimumInfoFragment, 'UsersMinimumInfo');

// note: keeping the fragment above makes the app crash

registerFragment(gql`
  fragment TrnCommentsList on Comment {
    # nova:comments
    _id
    postId
    parentCommentId
    topLevelCommentId
    body
    htmlBody
    postedAt
    # nova:users
    userId
    user {
      ...TrnUsersMinimumInfo 
    }
    # nova:posts
    post {
      _id
      commentCount
      commenters {
        ...TrnUsersMinimumInfo # it's working but I'm calling TrnUsersMinimumInfo here...
      }
    }
    # nova:voting
    upvoters {
      _id
    }
    downvoters {
      _id
    }
    upvotes
    downvotes
    baseScore
    score
  }
  ${getFragment('UsersMinimumInfo')} # ... and UsersMinimumInfo here (no prefix)
`, 'CommentsList');
