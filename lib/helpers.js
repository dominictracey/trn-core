import { Utils, getSetting } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Posts from 'meteor/nova:posts';

const trnCDN = getSetting('trnCDN')
const trnAPI = getSetting('trnAPI')

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
  return trnAPI
}

export const getTRNhostName = () => {
  return trnCDN
}

export const getTeamLogoUrl = (team) => {
  return trnCDN + '/resources/teams/' + team.abbr + '/200.png'
}

export const getTeamCategoryLink = (team) => {
  return trnCDN + '/t/' + team.abbr + '/200.png'
}
