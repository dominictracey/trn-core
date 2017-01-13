import { Components, replaceComponent } from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/nova:users';

const TrnUsersMenu = ({currentUser, client}, context) => (
  <div className="users-menu">
    <Dropdown id="user-dropdown">
      <Dropdown.Toggle>
        <Components.UsersAvatar size="small" user={currentUser} link={false} />
        <div>{Users.getDisplayName(currentUser)}</div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LinkContainer to={`/users/${currentUser.__slug}`}>
          <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
        </LinkContainer>
        <LinkContainer to={`/account`}>
          <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
        </LinkContainer>
        {Users.canDo(currentUser, 'categories.edit.all') ? <LinkContainer to={`/admin`}>
          <MenuItem className="dropdown-item" eventKey="3"><FormattedMessage id="categories.manage"/></MenuItem>
        </LinkContainer> : null}
        <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

replaceComponent('UsersMenu', TrnUsersMenu);
