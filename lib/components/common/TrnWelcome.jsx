import { registerComponent } from 'meteor/nova:lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const TrnWelcome = props => {
  return (

    <div className="welcome">
      <h3><FormattedMessage id="trn.welcomeBanner"/></h3>
      <div>
        <p>We are a group of rugby fans developing an exciting new open source platform to define the future of how we engage with the "sport played in heaven".
        We see so much potential for the rapidly changing landscape of social media, mobile, video and broadcast media, games and fantasy sports, stats and analysis and the free-wheeling global rugby calendar from test to social rugby.
        </p><p>
        Our open community is growing so jump in and help shape the way forward! Here’s how:
        <ol>
          <li>Sign up for an account</li>
          <li>Click on the Meta group above and introduce yourself. This is where we talk about the site itself so leave feedback or ideas on things we can do better.</li>
          <li>Get involved with our open source project. Send an email to dominic.tracey@rugby.net if you would like information on getting involved. Some options:</li>
          <ul>
            <li>Content contributors</li>
            <li>Moderators</li>
            <li>Beta testers</li>
            <li>Designers</li>
            <li>Developers</li>
          </ul>
        </ol>
        </p><p>
        Play on!
        </p>
      </div>

    </div>
  )
}

TrnWelcome.displayName = "Welcome";

registerComponent('WelcomePage', TrnWelcome);
