import { GraphQLSchema } from 'meteor/vulcan:core';


GraphQLSchema.addMutation('increasePostViewCountBySlug(slug: String): Float');
