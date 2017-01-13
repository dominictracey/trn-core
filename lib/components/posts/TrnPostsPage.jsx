import { Components, registerComponent, getRawComponent } from 'meteor/nova:core';
import React from 'react';
import Posts from "meteor/nova:posts";
import gql from 'graphql-tag';
import { withDocument } from 'meteor/nova:core';

const TrnPostsPage = (props) => {
  if (props.loading) {

    return <div className="posts-page"><Components.Loading/></div>

  } else {

    const post = props.document;

    var body = {}
    if (!post.postType || post.postType === 'link') {
      body = <Components.PostsLinkBody post={post}/>
    } else if (post.postType === 'match') {
      body = <Components.PostsMatchBody post={post}/>
    }

    return (
      <div className="posts-page">

        <Components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />

        <Components.PostsItem post={post}/>

        {body}

        {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}

        <Components.PostsCommentsThread terms={{postId: post._id}} />

      </div>)
    }
}

TrnPostsPage.propTypes = {
  document: React.PropTypes.object
}

TrnPostsPage.fragment = gql`
  fragment TrnPostsSingleFragment on Post {
    _id
    title
    url
    body # extra
    htmlBody # extra
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
    }
    commentCount
    commenters {
      # ...avatarUserInfo
      _id
      __displayName
      __emailHash
      __slug
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
      __displayName
      __emailHash
      __slug
    }
    userId
    postType
    trnId
    color
  }
`;

TrnPostsPage.displayName = "TrnPostsPage";

const options = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragment: TrnPostsPage.fragment,
};

registerComponent('PostsPage', TrnPostsPage, withDocument(options));
