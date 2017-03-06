import { Utils, getSetting } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Posts from 'meteor/nova:posts';
import Users from "meteor/nova:users";

import emojilib from 'emojilib'

const trnCDN = getSetting('trnCDN')
const trnAPI = getSetting('trnAPI')

Categories.availableTypes = [
  {value: "comp", slug: 'c', label: "Competition"},
  {value: "team", slug: 't', label: "Team"},
  {value: "normal", slug: 'n', label: "General category"},
  // note: player type is disabled for now as not handled by the admin panel
  // {value: "player", label: "Player"},
];

Categories.getUrl = (category, isAbsolute = false) => {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : "";

  // find the category type
  const categoryType = Categories.availableTypes.find(({value}) => category.type === value);

  return `${prefix}/${categoryType.slug}/${category.slug}`;
};

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

Utils.getLogoFromAbbr = (abbr) => {
  return trnCDN + '/resources/teams/' + abbr + '/200.png'
}

Utils.replaceEmojis = (str) => {
  const emojis = Object.keys(emojilib.lib).reduce((result, key) => {
    result[key] = result[key] || emojilib.lib[key].char
    emojilib.lib[key].keywords.forEach(keyword => {
      result[keyword] = result[keyword] || emojilib.lib[key].char
    })
    return result
  }, {})

  const re = /\:(\w+)\:/g
  return (str.match(re) || []).reduce((str, match) => {
    const keyword = match.replace(/\:/g,"")
    if (emojis[keyword]) {
      return str.replace(match, emojis[keyword])
    } else {
      return str
    }
  }, str)
}

// get the logo of category (from the db or the TRN API)
Categories.getLogo = (category, categoryTypeValue) => {

  // find the category type if not provided
  if (!categoryTypeValue) {
    const categoryType = Categories.availableTypes.find(({value}) => category.type === value);

    categoryTypeValue = categoryType.value;
  }

  // @REX that 's' is such a nasty hack!
  return `${getTRNhostName()}resources/${categoryTypeValue}s/${category.abbr}/200.png`;
};


// posts helpers
Posts.getPageUrl = function(post, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : "";
  return `${prefix}/x/${post.slug}`;
}

// extends the Users.avatar function
const originalAvatarConstructor = Users.avatar;
Users.avatar = {
  ...originalAvatarConstructor,
  getUrl(user) {
    const url = originalAvatarConstructor.getUrl(user);

    return !!user && user.avatar ? user.avatar : url;
  }
};

Posts.getLinkDomain = function(post) {
  return !!post.url ? post.url.split('/')[2] : null
}

Posts.getLink = function (post, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(post.url) : post.url;
  return !!post.url && post.postType !== 'video' ? url : Posts.getPageUrl(post, isAbsolute);
};

Posts.getLinkTarget = function (post) {
  return !!post.url && post.postType !== 'video' ? "_blank" : "";
};

Users.getProfileUrl = function (user, isAbsolute) {
  if (typeof user === "undefined") {
    return "";
  }
  isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : "";
  if (user.slug) {
    return `${prefix}/u/${user.slug}`;
  } else {
    return "";
  }
};
