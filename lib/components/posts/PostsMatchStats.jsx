import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsMatchStats = (props) => {
  if(props.params.statsType == "players"){
    return <Components.PostsPage slug={props.params.slug} type={"players"} />
  }
  else if(props.params.statsType == "teams"){
    return <Components.PostsPage slug={props.params.slug} type={"teams"} />
  }
};

PostsMatchStats.displayName = "PostsMatchStats";

registerComponent('PostsMatchStats', PostsMatchStats);
