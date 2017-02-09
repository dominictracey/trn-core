import { Components, replaceComponent } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import Users from 'meteor/nova:users';

const TrnUsersEditForm = (props, context) => {
  return (
    <Components.ShowIf
      check={Users.options.mutations.edit.check}
      document={props.terms.documentId ? {_id: props.terms.documentId} : {slug: props.terms.slug}}
      failureComponent={<FormattedMessage id="app.noPermission"/>}
    >
      <div className="page users-edit-form">
        <h2 className="page-title users-edit-form-title">
          <FormattedMessage id="users.edit_account"/>
          <Components.WiresNewButton prefilledProps={{context: "users edit form"}} />
        </h2>
        <Components.SmartForm 
          collection={Users} 
          {...props.terms}
          successCallback={user => {
            props.flash(context.intl.formatMessage({id: "users.edit_success"}, {name: Users.getDisplayName(user)}), 'success')
          }}
          showRemove={true}
        />
      </div>
    </Components.ShowIf>
  );
};


TrnUsersEditForm.propTypes = {
  terms: React.PropTypes.object, // a user is defined by its unique _id or its unique slug
};

TrnUsersEditForm.contextTypes = {
  intl: intlShape
};

TrnUsersEditForm.displayName = "TrnUsersEditForm";

replaceComponent('UsersEditForm', TrnUsersEditForm);
