import { registerComponent } from 'meteor/nova:core';
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
        We've got a lot going for us already, including:
        <ul>
          <li>Detailed feeds of match statistics, standings and player data from the world's biggest competitions.</li>
          <li>A robust <a href="http://www.rugby.net">analysis platform</a> for rating and comparing player performances.</li>
          <li>Getting close to 10K in our <a href="http://facebook.com/TheRugbyNet/">Facebook</a> audience.</li>
          <li>Lots of engagement from professional players on our <a href="http://twitter.com/TheRugbyNet">twitter</a> feed.</li>
          <li>A good domain name.</li>
          <li>Lots of rugby friends around the world!</li>
        </ul>
        Our open community is growing so jump in and help shape the way forward! Here’s how:
        <ol>
          <li>Sign up for an account</li>
          <li>Click on the Meta group above and introduce yourself. This is where we talk about the site itself so leave feedback or ideas on things we can do better.</li>
          <li>Get involved with our open source project. Send an email to dominic.tracey@rugby.net if you would like information on getting involved. Some options:</li>
        </ol>
          <div className='welcome-container'>
            <div className='welcome-column'>
              <div className='welcome-header welcome-header-1'>Content Creators</div>
              <div className='welcome-content'>Have a blog or Youtube channel? Post your links on here. We are also looking for video highlights creators and sports copywriters so drop us a line!</div>
            </div>
            <div className='welcome-column'>
              <div className='welcome-header welcome-header-2'>Moderators</div>
              <div className='welcome-content'>Keep an eye on the asylum!</div>
            </div>
            <div className='welcome-column'>
              <div className='welcome-header welcome-header-3'>Beta testers</div>
              <div className='welcome-content'>Bang away at the new features and file bug reports. Get to see the cool new stuff first!</div>
            </div>
            <div className='welcome-column'>
              <div className='welcome-header welcome-header-4'>Graphic Designers</div>
              <div className='welcome-content'>We need help looking pretty.</div>
            </div>
            <div className='welcome-column'>
              <div className='welcome-header welcome-header-5'>Developers</div>
              <div className='welcome-content'>Create PRs and let's get this puppy off the ground!</div>
            </div>
          </div>

        </p><p>
        Thanks for joining in - Play on!
        </p>
      </div>

    </div>
  )
}

TrnWelcome.displayName = "Welcome";

registerComponent('WelcomePage', TrnWelcome);
