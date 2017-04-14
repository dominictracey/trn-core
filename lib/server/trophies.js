import { Trophies, addTrophy } from 'meteor/xavcz:vulcan-trophies';

/* seed:
 * ...trophySchema
 * ...callbackStructure
 */

const trophiesSeeds = [
  {
    // schema
    title: 'Founder',
    slug: 'founding',
    value: 10,
    description: 'Founding Member of The Rugby Net',
    // callback
    operation: 'users.new',
    icon: 'leaf',
    condition: () => true,
  },
  {
    // schema
    title: 'First post',
    slug: 'first-post',
    value: 1,
    description: 'Poster on The Rugby Net',
    // callback
    operation: 'posts.new',
    icon: 'star-o',
    // note: the count is not yet updated at this point
    condition: (post, currentUser) => currentUser.postCount === 0,
  },
  {
    // schema
    title: 'Ten posts',
    slug: 'ten-posts',
    value: 10,
    description: 'Ten posts on The Rugby Net',
    // callback
    operation: 'posts.new',
    icon: 'star-half-o',
    // note: the count is not yet updated at this point
    condition: (post, currentUser) => currentUser.postCount === 9,
  },
  {
    // schema
    title: 'Fifty posts',
    slug: 'fifty-posts',
    value: 20,
    description: 'Fifty posts on The Rugby Net',
    // callback
    operation: 'posts.new',
    icon: 'star',
    // note: the count is not yet updated at this point
    condition: (post, currentUser) => currentUser.postCount === 49,
  },
  {
    // schema
    title: 'Moderator',
    slug: 'mod',
    value: 20,
    description: 'Moderator on The Rugby Net',
    // callback
    operation: 'users.edit',
    icon: 'legal',
    
    condition: (user, currentUser) => user.groups.includes('mods'),
  },
];

// patch for now, it's not a reliable solution, it'll be handled in a UI then
// if no trophies, insert them

trophiesSeeds.forEach(({operation, condition, ...seed}) => Trophies.upsert({slug: seed.slug}, { ...seed, active: true }, {bypassCollection2: true}))



trophiesSeeds.forEach(({ operation, condition, slug }) =>
  addTrophy({
    operation,
    slug,
    condition,
  })
);
