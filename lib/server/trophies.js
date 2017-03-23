import { Trophies, addTrophy } from 'meteor/xavcz:vulcan-trophies';

/* seed:
 * ...trophySchema
 * ...callbackStructure
 */

const trophiesSeeds = [
  {
    // schema
    title: 'Founder',
    slug: 'founder',
    value: 10,
    description: 'Pioneer of The Rugby Net',
    // callback
    operation: 'users.new',
    condition: () => true,
  },
  {
    // schema
    title: 'First post',
    slug: 'first-post',
    value: 1,
    description: 'First time you\'ve posted on TRN!',
    // callback
    operation: 'posts.new',
    // note: the count is not yet updated at this point
    condition: (post, currentUser) => currentUser.postCount === 0,
  },
  {
    // schema
    title: 'Top poster',
    slug: 'top-poster',
    value: 10,
    description: '10 posts on TRN!',
    // callback
    operation: 'posts.new',
    // note: the count is not yet updated at this point
    condition: (post, currentUser) => currentUser.postCount === 9,
  },
  {
    // schema
    title: 'Moderator',
    slug: 'mod',
    value: 20,
    description: 'You are a moderator on TRN!',
    // callback
    operation: 'users.edit',
    // note: the count is not yet updated at this point
    condition: (user, currentUser) => user.groups.includes('mods'),
  },
];

// patch for now, it's not a reliable solution, it'll be handled in a UI then
// if no trophies, insert them
if (Trophies.find().count() === 0) {
  trophiesSeeds.forEach(({operation, condition, ...seed}) => Trophies.insert(seed));
}


trophiesSeeds.forEach(({ operation, condition, slug }) =>
  addTrophy({
    operation,
    slug,
    condition,
  })
);
