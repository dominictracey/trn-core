import { Utils } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Posts from 'meteor/nova:posts';

Categories.availableTypes = [
  {value: "comp", slug: 'c',label: "Competition"},
  {value: "team", slug: 't',label: "Team"},
  {value: "normal", slug: 'n',label: "General category"},
  // note: player type is disabled for now as not handled by the admin panel
  // {value: "player", label: "Player"},
];

Posts.getPageUrl = function(post, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : "";
  return `${prefix}/x/${post.slug}`;
}

export const getTRNapi = () =>  {
  return 'https://fantasyrugbyengine-hrd.appspot.com/_ah/api/topten/v1/'
}

export const getTRNhostName = () => {
  return 'http://dev.rugby.net/'
}

export const getTeamLogoUrl = (team) => {
  return getTRNhostName() + '/resources/teams/' + team.abbr + '/200.png'
}

export const getTeamCategoryLink = (team) => {
  return getTRNhostName() + '/t/' + team.abbr + '/200.png'
}
