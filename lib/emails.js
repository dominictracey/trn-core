/*
We register new emails on both client and server to make them available
to the emails dashboard.
*/

import NovaEmail from 'meteor/vulcan:email';

NovaEmail.addEmails({

  newFeedback: {
    template: "newFeedback",
    path: "/email/new-feedback",
    getProperties: data => data, // handled in async callback
    subject: ({ senderName }) => `New message from ${senderName}`,
    getTestObject: () => ({}),
  }

});
