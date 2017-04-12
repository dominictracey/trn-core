import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActions, getSetting, Components, registerComponent } from 'meteor/vulcan:core';

class PostsRatingBody extends Component {
	constructor(props) {
		super(props)
	}

	async componentDidMount() {
		const { post, loadRatingQuery }= this.props

		if(!post && !post.trnId) {
			return    // RUN!
		}
		console.log("Fetching Ratings")
		await loadRatingQuery(post.trnId)   // Fetch ratingQuery
		console.log("Fetched.")
	}

  render() {
    const { post, detailedRatingQuery } = this.props

    const htmlBody = {__html: post.htmlBody}
    return (
      <div>
	      {detailedRatingQuery ? <div className="posts-page-ratings"><Components.RatingTable queryId={post.trnId} /></div> : <Components.Loading />}
        {post.htmlBody && <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div>}
      </div>
    )
  }
}

const mapStateToProps = ({entities: { detailedRatingQuery } }) => ({ detailedRatingQuery });

const { loadRatingQuery } = getActions();

const mapDispatchToProps = dispatch => bindActionCreators({ loadRatingQuery }, dispatch);

registerComponent('PostsRatingBody', PostsRatingBody, connect(mapStateToProps, mapDispatchToProps));
