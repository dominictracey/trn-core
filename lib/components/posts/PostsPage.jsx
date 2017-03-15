import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/nova:core';
import Posts from 'meteor/nova:posts';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

class PostsPage extends Component {

  render() {
    if (this.props.loading) {

      return <div className="posts-page"><Components.Loading/></div>

    } else if (!this.props.document) {

      console.log(`// missing post (_id: ${this.props.documentId})`);
      return <div className="posts-page"><FormattedMessage id="app.404"/></div>

    } else {
      const post = this.props.document;

      //const htmlBody = {__html: post.htmlBody};
      let body = null;
      if (!post.postType || post.postType === 'link') {
        body = <Components.PostsLinkBody post={post}/>
      } else if (post.postType === 'match') {
        body = <Components.PostsMatchBody post={post} type={this.props.type ? this.props.type : null}/>
      } else if (post.postType === 'video') {
        body = <Components.PostsVideoBody post={post}/>
      }

      return (
        <div className="posts-page">
          <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />

          <Components.PostsItem post={post} currentUser={this.props.currentUser} />
          
          <div className="posts-page-social-buttons">
            <Components.SocialButton type="facebook" post={post} />
            <Components.SocialButton type="twitter" post={post} />
          </div>
          
          {/* {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null} */}
          { body }

          <Components.PostsCommentsThread terms={{postId: post._id, view: 'postComments'}} />

        </div>
      );

    }
  }

  // triggered after the component did mount on the client
  async componentDidMount() {
    try {

      // destructure the relevant props
      const {
        // from the parent component, used in withDocument, GraphQL HOC
        slug,
        // from connect, Redux HOC
        setViewed,
        postsViewed,
        // from withMutation, GraphQL HOC
        increasePostViewCountBySlug,
      } = this.props;

      // a post id has been found & it's has not been seen yet on this client session
      if (slug && !postsViewed.includes(slug)) {

        // trigger the asynchronous mutation with postId as an argument
        await increasePostViewCountBySlug({slug: slug});

        // once the mutation is done, update the redux store
        setViewed(slug);
      }

    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
}

PostsPage.displayName = "PostsPage";

PostsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  postsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increasePostViewCountBySlug: PropTypes.func,
}

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostsPage',
};

const mutationOptions = {
  name: 'increasePostViewCountBySlug',
  args: {slug: 'String'},
};

const mapStateToProps = state => ({ postsViewed: state.postsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().postsViewed, dispatch);

registerComponent(
  // component name used by Nova
  'PostsPage',
  // React component
  PostsPage,
  // HOC to give access to the current user
  withCurrentUser,
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions],
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions),
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
