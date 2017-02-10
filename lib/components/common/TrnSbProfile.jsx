import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Components, registerComponent, withDocument, getFragment } from 'meteor/nova:core';
import Users from 'meteor/nova:users';

const TrnSbProfile = ({ document: user, loading }, context) => {
  return loading ? <Components.Loading /> : (
      <div className='sidebar-card'>
        <div className='sidebar-card-header sidebar-card-header--profile'>
          <Link to='/account'>
            <Components.UsersAvatar size='small' user={user} link={false} />
            <div>{Users.getDisplayName(user)}</div>
          </Link> 
          <Components.WiresNewButton
            prefilledProps={{context: 'profile sidebar'}}
            className="profile-feedback"
          />
        </div>
        <div className='sidebar-card-body'>
          {
            ['Posts', 'Comments'].map(type => {
              
              // upvotedPosts \\ upvotedComments  
              const dataType = `upvoted${type}`;  
              
              // extract the field define above, default value empty array
              const votesArray = user[dataType] || []; 
              
              return (
                <div className='users-profile-votes' key={type}>
                  <FormattedMessage id={`users.upvoted${type}`} values={{total: votesArray.length}} />
                </div>
              )
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

const options = {
  collection: Users,
  fragment: getFragment('UsersProfile'),
  queryName: 'usersProfileSidebar',
  pollInterval: 5000,
};

registerComponent('TrnSbProfile', TrnSbProfile, [withDocument, options]);
