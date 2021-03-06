import React, { PropTypes } from 'react';
import { branch, renderComponent } from 'recompose';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { registerComponent, withCurrentUser, Components } from 'meteor/vulcan:core';

const UsersTrophiesList = ({ currentUser: { trophies }}) => (
  <div className="users-trophies">
    <div className="users-trophies-title"><FormattedMessage id="users.trophies" /></div>
    {
      // slug is meant to be a uniq identifier humanly readable and also the icon name
      trophies.map(({ trophy: { _id, slug, title, value, icon, description }, earnedAt }) => (
        <span className="users-trophies-item" key={_id}>
          <a data-tip data-for={`user-trophy-${_id}`}>
            {/* <span>{value} 🏆</span> {title} */}
            <span className='sidebar-icon'><Components.Icon name={icon}/></span>
          </a>
          <ReactTooltip
            id={`user-trophy-${_id}`}
            place="top"
            type="dark"
            effect="float"
          >
            {description}
          </ReactTooltip>
        </span>
      ))
    }

  </div>
);

const displayNoTrophies = branch(
  ({ currentUser }) => !currentUser.trophies || !currentUser.trophies.length,
  renderComponent(() => <FormattedMessage id="users.no_trophies" />)
);

registerComponent('UsersTrophiesList', UsersTrophiesList, withCurrentUser, displayNoTrophies);
