import { Components, registerComponent, getRawComponent, withCurrentUser, withDocument } from 'meteor/nova:core';
import React from 'react';
import Posts from "meteor/nova:posts";
import gql from 'graphql-tag';

const TrnPostsPage = (props) => {
  if (props.loading) {

    return <div className="posts-page"><Components.Loading/></div>

  } else {

    const {document: post, currentUser} = props;

    let body = null;
    if (!post.postType || post.postType === 'link') {
      body = <Components.PostsLinkBody post={post}/>
    } else if (post.postType === 'match') {
      body = <Components.PostsMatchBody post={post}/>
    } else if (post.postType === 'video') { 
      body = <Components.PostsVideoBody post={post}/>
    }

    return (
      <div className="posts-page">

        <Components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />

        <Components.PostsItem post={post} currentUser={currentUser}/>
        
        <div className="posts-page-social-buttons">
          <Components.SocialButton type="facebook" post={post} />
          <Components.SocialButton type="twitter" post={post} />
        </div>
        
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
      type
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
    postType
    trnId
    color
    # embedly related stuff
    media
  }
`;

TrnPostsPage.displayName = "TrnPostsPage";

const options = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragment: TrnPostsPage.fragment,
};

registerComponent('PostsPage', TrnPostsPage, withCurrentUser, withDocument(options));
