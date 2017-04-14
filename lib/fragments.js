import { extendFragment, registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment TrophyItem on Trophy {
    _id
    slug
    title
    value
    description
    icon
    active
  }
`);

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
      icon
      active
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
