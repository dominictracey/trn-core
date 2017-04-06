import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActions, getSetting, Components, registerComponent, withMessages } from 'meteor/vulcan:core';

class PostsRatingBody extends Component {
	constructor(props) {
		super(props)
	}

	async componentDidMount() {
		const { loadRatingQuery }= this.props

		console.log("Fetching Ratings")
		await loadRatingQuery(5628709818073088)
		console.log("Fetched.")
	}

  render() {
    const { post, detailedRatingQuery } = this.props


    const htmlBody = {__html: post.htmlBody}
    return (
      <div>
	      {detailedRatingQuery ? <div className="posts-page-ratings"><Components.RatingTable queryId={'5628709818073088'} /></div> : <Components.Loading />}
	      {/*detailedRatingQuery ? <div><Components.PMSRatingTable queryId={'5628709818073088'} /></div> : <Components.Loading/>*/}
        {post.htmlBody && <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div>}
      </div>
    )
  }
}

const mapStateToProps = ({entities: { detailedRatingQuery } }) => ({ detailedRatingQuery });

const { loadRatingQuery } = getActions();

const mapDispatchToProps = dispatch => bindActionCreators({ loadRatingQuery }, dispatch);

registerComponent('PostsRatingBody', PostsRatingBody, connect(mapStateToProps, mapDispatchToProps));
