import Users from 'meteor/nova:users';
import { addCallback, removeCallback, Utils } from 'meteor/nova:core';
import Telescope from 'meteor/nova:lib';

removeCallback('categories.parameters', 'CategoriesAscOrderSorting');

const CategoriesDescOrderSorting = (parameters, terms) => {
  parameters.options.sort = {order: -1};
  
  return parameters;
};

addCallback('categories.parameters', CategoriesDescOrderSorting);

const CategoriesFilterVisible = (parameters, terms) => {
  if (terms.onlyVisible) {
    parameters.selector.visible = true;
  }
  
  return parameters;
};

addCallback('categories.parameters', CategoriesFilterVisible);


// only show sticky posts when filtering posts list by categorie
const PostsShowStickyOnlyOnCategories = (parameters, terms) => {
  
  if (!terms.cat) {
    parameters.selector.sticky = {$ne: true};
  }
  
  return parameters;
};

addCallback('posts.parameters', PostsShowStickyOnlyOnCategories);

const WiresNewAssignAdminRecipient = wire => {
  
  const [ firstAdmin ] = Users.adminUsers({});
  
  return {
    ...wire,
    recipientId: firstAdmin._id,
  };
};

addCallback('wires.new.sync', WiresNewAssignAdminRecipient);

removeCallback('wires.new.async', 'WiresNewSendEmailAsync');

const WiresNewSendFeedback = wire => {
  
  const { senderId, recipientId, htmlBody, createdAt, reaction, parentComponentName, location, context } = wire;
  const { email: senderEmail, slug: senderSlug, displayName: senderName } = Users.findOne({_id: senderId});
  const { email: recipientEmail } = Users.findOne({_id: recipientId});
  
  const notificationData = {
    // email sender
    senderEmail,
    senderName,
    senderProfile: `${Utils.getSiteUrl()}users/${senderSlug}`,
    //email recipient
    recipientEmail,
    // email body
    htmlBody,
    createdAt,
    reaction,
    // parentComponentName,
    location,
    context,
  };
  
  Telescope.notifications.create(recipientId, 'newFeedback', notificationData);
  
};

addCallback('wires.new.async', WiresNewSendFeedback);
