import React, { PropTypes, Component } from 'react';
import { branch, renderComponent } from 'recompose';
import { Components, withList, withCurrentUser, Loading, registerComponent, getFragment } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Trophies } from 'meteor/xavcz:vulcan-trophies';

const Form = ({ trophyId, closeModal }) => 
  <Components.SmartForm
    collection={Trophies}
    documentId={trophyId}
    mutationFragment={getFragment('TrophyItem')}
    successCallback={() => closeModal()}
    showRemove={false}
  />

const EditButton = ({ trophyId, active }) => (
  <div className="edit-trophy">
    <Components.ModalTrigger 
      title="Edit trophy" 
      component={<button className={`btn btn-${active ? 'success' : 'danger'}`}>Edit trophy</button>}
    >
      <Form trophyId={trophyId} />
    </Components.ModalTrigger>
  </div>
);

const UsersTrophiesAdminList = ({ results = [], currentUser }) => (
  <div className="trophies">
    <h3>Trophies management: (de)activation</h3>
    {results.map(({ _id, slug, title, value, description, active }) => (
      <div key={_id}>
        <div className="users-trophies-title">{title} ({value})</div>
        <div>Slug: {slug}</div>
        <div>Description: {description}</div>
        <EditButton trophyId={_id} active={active} />
      </div>
    ))}
  </div>
);

const options = {
  collection: Trophies,
  queryName: 'trophiesListQuery',
  fragmentName: 'TrophyItem',
};

const withLoadingState = branch(
  ({ loading }) => loading,
  renderComponent(() => <Loading />),
);

// note: you can also use ShowIf instead of this branch.
const withPermission = branch(
  ({ currentUser }) => !currentUser || !Users.canDo(currentUser, 'trophies.edit'),
  renderComponent(() => <div>Sorry, you're not allowed to see this page</div>)
);

registerComponent('UsersTrophiesAdminList', UsersTrophiesAdminList, withCurrentUser,  withPermission, withList(options), withLoadingState);
