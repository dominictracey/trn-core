/* 
Register email templates.
*/

import NovaEmail from 'meteor/nova:email';

NovaEmail.addTemplates({
  newFeedback: Assets.getText("lib/server/emails/newFeedback.handlebars"),
});
