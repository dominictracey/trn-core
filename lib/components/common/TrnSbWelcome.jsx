import React, { PropTypes, Component } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const TrnSbWelcome = (props, context) => {
  return (
    <div className='sidebar-card'>
      <div className='sidebar-card-header'>About</div>
      <div className='sidebar-card-body'>
      <p>
        An open community of rugby fans from around the world sharing the best banter, video and content the Internet has to offer.
      </p>
      <div className='sidebar-sbwelcome-container'>
        <div className='sidebar-sbwelcome-box'>
          Say hi over on the <Link to={"/c/meta"}>meta thread.<br/>
          <span className='sidebar-icon'><Components.Icon name={'comments'}/></span></Link>
        </div>
        <div className='sidebar-sbwelcome-box sidebar-sbwelcome-box-dividers'>
          Love rugby and technology? <Link to={"/welcome"}>Read more<br/>
          <span className='sidebar-icon'><Components.Icon name={'info-circle'}/></span></Link>
        </div>
        <div className='sidebar-sbwelcome-box'>Source code for this project is available <a href="https://github.com/dominictracey/trn-core">here.<br/>
          <span className='sidebar-icon'><Components.Icon name={'github'} /></span></a>
        </div>
      </div>
      </div>
    </div>
  );
};


TrnSbWelcome.propTypes = {
  // post: React.PropTypes.object.isRequired
};

TrnSbWelcome.displayName = "TrnSbWelcome";

registerComponent('TrnSbWelcome', TrnSbWelcome);
