import Users from 'meteor/vulcan:users';

/*
  Let's create a new "mods" group that can edit and delete any posts
*/

Users.createGroup("mods");

const modPerms = [
  "posts.edit.all",   // mods can edit anybody's posts
  "posts.remove.all", // mods can delete anybody's posts
  "posts.new.match",  // mods can post match threads from FnR
]
Users.groups.mods.can(modPerms);

const adminPerm = [
  "posts.new.match"
]
Users.groups.admins.can(adminPerm); // admins can post match threads from FnR
