import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Components, registerComponent } from 'meteor/nova:core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Users from 'meteor/nova:users';

const TrnSbProfile = ({ loading, currentUser, data }, context) => {
  if (loading) {
    return <Components.Loading />;
  }
  
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
          ['Posts', 'Comments'].map((collectionType, index) => {
            
            const totalKarmaValue = data[`total${collectionType}Karma`];
            const intlId = totalKarmaValue ? `profile.total${collectionType}Karma` : `profile.no${collectionType}Karma`;
            
            return (
              <div className='users-profile-votes' key={collectionType}>
                <FormattedMessage id={intlId} values={{totalKarmaValue}} />
              </div>
            );
          }) 
        }
      </div>
    </div>
  );
};


TrnSbProfile.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbProfile.displayName = 'TrnSbProfile';

// ask for total karma on posts & comments, aliasing the field name (same query with different args)
const withData = graphql(gql`
  query userTotalPostsAndCommentsKarma($userId: String!) {
    totalPostsKarma: userTotalKarma(userId: $userId, collectionType: "Posts")
    totalCommentsKarma: userTotalKarma(userId: $userId, collectionType: "Comments")
  }
`, {
  // destructure props
  options: ({ userId }) => ({
    variables: { userId },
  })
});

registerComponent('TrnSbProfile', TrnSbProfile, withData);
