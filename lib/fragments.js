import { extendFragment } from 'meteor/vulcan:core';

extendFragment('UsersMinimumInfo', `
  avatar
`);

extendFragment('UsersCurrent', `
  avatar
  trophies {
    trophy {
      _id
      slug
      title
      value
      description
    }
    earnedAt
  }
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

extendFragment('CategoriesList', `
  attachedTeams {
    ...CategoriesMinimumInfo
  }
`);
