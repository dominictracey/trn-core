import React, { Component } from 'react'
import { registerComponent } from 'meteor/nova:core'
import { Link } from 'react-router';

const FnRStream = (props, context) => {

  return (
    props.streamId ?
      <div className="FnR-match-espn">
        <Link to={`http://www.espn.com/watchespn/player/_/id/${props.streamId}/`} target="_blank">
          <img src="http://a.espncdn.com/espn3/images/watchespn/slideshow_logo_espn3.png" title="Watch Espn" />
        </Link>
      </div>
    :
      <div className="FnR-match-espn">
        <img src="http://www.rugby.net/icons/no-stream.png" />
      </div>
  )

}

registerComponent("FnRStream", FnRStream)
