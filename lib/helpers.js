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
};
