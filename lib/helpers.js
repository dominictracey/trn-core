import { Utils } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import Posts from 'meteor/nova:posts';
import Users from "meteor/nova:users";

// general helpers
export const getTRNapi = () =>  {
  return 'https://fantasyrugbyengine-hrd.appspot.com/_ah/api/topten/v1/'
}

export const getTRNhostName = () => {
  return 'http://www.rugby.net/'
}

// categories helpers
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

// get the logo of category (from the db or the TRN API)
Categories.getLogo = (category, categoryTypeValue) => {
  
  // find the category type if not provided
  if (!categoryTypeValue) {
    const categoryType = Categories.availableTypes.find(({value}) => category.type === value);
    
    categoryTypeValue = categoryType.value;
  }
  
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
