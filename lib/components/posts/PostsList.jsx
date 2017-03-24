import { Components, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Alert } from 'react-bootstrap';

const TrnPostsList = (props) => {

  const {results, loading, count, totalCount, loadMore, showHeader = true, networkStatus, currentUser, error, terms} = props;

  const loadingMore = networkStatus === 2;

  if (error && error.message.includes('Failed to fetch')) {
    return <Alert bsStyle="info">The content you were viewing has timed out. Please reload.</Alert>
  } else if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <div className="posts-list">
        {showHeader ? <Components.PostsListHeader/> : null}
        <div className="posts-list-content">
          {results.map(post => <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} />)}
        </div>
        {hasMore ? (loadingMore ? <Components.PostsLoading/> : <Components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} />) : <Components.PostsNoMore/>}
      </div>
    )
  } else if (loading) {
    return (
      <div className="posts-list">
        {showHeader ? <Components.PostsListHeader /> : null}
        <div className="posts-list-content">
          <Components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="posts-list">
        {showHeader ? <Components.PostsListHeader /> : null}
        <div className="posts-list-content">
          <Components.PostsNoResults/>
        </div>
      </div>
    )
  }

};

TrnPostsList.displayName = "PostsList";

TrnPostsList.propTypes = {
  results: React.PropTypes.array,
  terms: React.PropTypes.object,
  hasMore: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  count: React.PropTypes.number,
  totalCount: React.PropTypes.number,
  loadMore: React.PropTypes.func,
  showHeader: React.PropTypes.bool,
};

replaceComponent('PostsList', TrnPostsList);
