/*
Let's add a callback to the new post method that
appends a random emoji to the newly submitted post's title.
*/
import { addCallback, removeCallback } from 'meteor/nova:core';

removeCallback('categories.parameters', 'CategoriesAscOrderSorting');

const CategoriesDescOrderSorting = (parameters, terms) => {
  parameters.options.sort = {order: -1};
  
  return parameters;
};

addCallback('categories.parameters', CategoriesDescOrderSorting);

const CategoriesFilterVisible = (parameters, terms) => {
  if (terms.onlyVisible) {
    parameters.selector.visible = true;
  }
  
  return parameters;
};

addCallback('categories.parameters', CategoriesFilterVisible);


// only show sticky posts when filtering posts list by categorie
const PostsShowStickyOnlyOnCategories = (parameters, terms) => {
  
  if (!terms.cat) {
    parameters.selector.sticky = {$ne: true};
  }
  
  return parameters;
};

addCallback('posts.parameters', PostsShowStickyOnlyOnCategories);
