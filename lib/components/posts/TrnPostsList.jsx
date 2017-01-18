import { Components, getRawComponent, registerComponent } from 'meteor/nova:lib';
import { withList } from 'meteor/nova:core';
import Posts from "meteor/nova:posts";
import gql from 'graphql-tag';

const newFragment = gql`
  fragment TrnPostsItemFragment on Post {
    _id
    title
    url
    slug
    thumbnailUrl
    baseScore
    postedAt
    sticky
    status
    categories {
      # ...minimumCategoryInfo
      _id
      name
      slug
      avatar
    }
    commentCount
    commenters {
      # ...avatarUserInfo
      _id
      displayName
      emailHash
      slug
      avatar
    }
    upvoters {
      _id
    }
    downvoters {
      _id
    }
    upvotes # should be asked only for admins?
    score # should be asked only for admins?
    viewCount # should be asked only for admins?
    clickCount # should be asked only for admins?
    user {
      # ...avatarUserInfo
      _id
      displayName
      emailHash
      slug
      avatar
    }
    userId
    trnId
    postType
  }
`;


const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragment: newFragment,
};

registerComponent('PostsList', getRawComponent('PostsList'), withList(options));
