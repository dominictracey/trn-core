/* 
Register email templates.
*/

import vulcanEmail from 'meteor/vulcan:email';

vulcanEmail.addTemplates({
  newFeedback: Assets.getText("lib/server/emails/newFeedback.handlebars"),
});
