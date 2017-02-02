import { extendFragment } from 'meteor/nova:core';

extendFragment('UsersMinimumInfo', `
  avatar
`);

extendFragment('PostsList', `
  media
  trnId
  postType
`);

extendFragment('CategoriesMinimumInfo', `
  type
  visible
  trnId
  image
  abbr
`);

// note: Will it work ????
extendFragment('CategoriesList', `
  attachedTeams {
    ...CategoriesMinimumInfo
  }
`);
