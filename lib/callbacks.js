import Users from 'meteor/nova:users';
import { addCallback, removeCallback, getSetting, Utils } from 'meteor/nova:core';
import { createNotification } from 'meteor/nova:notifications';
import marked from 'marked';

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

  createNotification(recipientId, 'newFeedback', notificationData);

};

addCallback('wires.new.async', WiresNewSendFeedback);

removeCallback('comments.new.sync', 'CommentsNewGenerateHTMLBody');
const CommentsNewGenerateHTMLBodyWithEmoji = (comment, user) => {
  comment.htmlBody = Utils.sanitize(Utils.replaceEmojis(marked(comment.body)));
  return comment;
}
addCallback("comments.new.sync", CommentsNewGenerateHTMLBodyWithEmoji);

removeCallback("comments.edit.sync", 'CommentsEditGenerateHTMLBody');
const CommentsEditGenerateHTMLBodyWithEmoji = (modifier, comment, user)  => {
  // if body is being modified, update htmlBody too
  if (modifier.$set && modifier.$set.body) {
    modifier.$set.htmlBody = Utils.sanitize(Utils.replaceEmojis(marked(modifier.$set.body)));
  }
  return modifier;
}
addCallback("comments.edit.sync", CommentsEditGenerateHTMLBodyWithEmoji);

removeCallback("posts.new.sync", "PostsNewHTMLContent")
const PostsNewHTMLContentWithEmoji = post => {
  if (post.body) {
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    const excerptLength = getSetting('postExcerptLength', 30);

    // extend the post document
    post = {
      ...post,
      htmlBody: Utils.sanitize(Utils.replaceEmojis(marked(post.body))),
      excerpt: Utils.trimHTML(Utils.sanitize(Utils.replaceEmojis(marked(post.body))), excerptLength),
    };
  }

  return post;
}
addCallback("posts.new.sync", PostsNewHTMLContentWithEmoji);

removeCallback("posts.edit.sync", "PostsEditHTMLContent");
const PostsEditHTMLContentWithEmoji = (modifier, post) => {
  if (modifier.$set && typeof modifier.$set.body !== 'undefined') {
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    const excerptLength = getSetting('postExcerptLength', 30);

    // extend the modifier
    modifier.$set = {
      ...modifier.$set,
      htmlBody: Utils.sanitize(Utils.replaceEmojis(marked(modifier.$set.body))),
      excerpt: Utils.trimHTML(Utils.sanitize(Utils.replaceEmojis(marked(modifier.$set.body))), excerptLength),
    };
  } else if (modifier.$unset && modifier.$unset.body) {
    // extend the modifier
    modifier.$unset = {
      ...modifier.$unset,
      htmlBody: true,
      excerpt: true,
    };
  }

  return modifier;
}
addCallback("posts.edit.sync", PostsEditHTMLContentWithEmoji);
