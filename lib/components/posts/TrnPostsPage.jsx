import { Components, replaceComponent } from 'meteor/nova:core';
import React from 'react';
import Posts from "meteor/nova:posts";

const TrnPostsPage = (props) => {
  if (props.error) {
    if (props.error.message && props.error.message.includes('Network error: Failed to fetch')) {
      console.log('reloaded after network error (PostsPage)')
      window.reload()
      return
    }
  }

  if (props.loading) {

    return <div className="posts-page"><Components.Loading/></div>

  } else {

    const {document: post, currentUser} = props;

    let body = null;
    if (!post.postType || post.postType === 'link') {
      body = <Components.PostsLinkBody post={post}/>
    } else if (post.postType === 'match') {
      body = <Components.PostsMatchBody post={post} type={props.type ? props.type : null}/>
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

        <Components.PostsCommentsThread terms={{postId: post._id, view: 'postComments'}} />

      </div>)
    }
}

TrnPostsPage.propTypes = {
  document: React.PropTypes.object
}
replaceComponent('PostsPage', TrnPostsPage);
