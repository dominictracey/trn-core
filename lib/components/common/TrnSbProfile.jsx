import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Components, registerComponent } from 'meteor/nova:core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Users from 'meteor/nova:users';

const TrnSbProfile = ({ loading, currentUser, data: { postsList = [], commentsUsersList = [] }}, context) => {
  if (loading) {
    return <Components.Loading />;
  }
  
  // loop over a list of posts / comments, and accumulate each upvotes
  const upvotesTotalList = [postsList, commentsUsersList].map(list => list.reduce((total, item) => total + item.upvotes, 0));
  
  return (
    <div className='sidebar-card'>
      <div className='sidebar-card-header sidebar-card-header--profile'>
        <Link to='/account'>
          <Components.UsersAvatar size='small' user={currentUser} link={false} />
          <div>{Users.getDisplayName(currentUser)}</div>
        </Link> 
        <Components.WiresNewButton
          prefilledProps={{context: 'profile sidebar'}}
          className="profile-feedback"
        />
      </div>
      <div className='sidebar-card-body'>
        {
          ['posts', 'comments'].map((type, index) => (
            <div className='users-profile-votes' key={type}>
              <FormattedMessage id={`profile.${type}Karma`} values={{total: upvotesTotalList[index]}} />
            </div>
          )) 
        }
      </div>
    </div>
  );
};


TrnSbProfile.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbProfile.displayName = 'TrnSbProfile';

const withData = graphql(gql`
  query usersStats($terms: JSON) {
    postsList(terms: $terms) {
      upvotes
    }
    commentsUsersList(terms: $terms) {
      upvotes
    }
  }
`);

registerComponent('TrnSbProfile', TrnSbProfile, withData);
