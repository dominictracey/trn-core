import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';

const AdminCategoryFromCompButton = (props, context) => {

  const { compId, name, onClick } = props
//  const size = context.currentUser ? "large" : "small";
//  const button = <Button className="posts-new-button" bsStyle="primary"><FormattedMessage id="posts.new_post"/></Button>;
  const label = !compId
    ? "Activate"
    : "Create"
  return (
    <Button className="posts-new-button" bsStyle="primary" onClick={onClick}>{label}</Button>
  )
}

AdminCategoryFromCompButton.displayName = "AdminCategoryFromCompButton";

// PostsNewButton.contextTypes = {
//   currentUser: React.PropTypes.object,
//   messages: React.PropTypes.object,
//   intl: intlShape
// }

module.exports = AdminCategoryFromCompButton;
export default AdminCategoryFromCompButton;
