import { GraphQLSchema } from 'meteor/nova:core';


GraphQLSchema.addMutation('increasePostViewCountBySlug(slug: String): Float');
