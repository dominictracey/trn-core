import { GraphQLSchema } from 'meteor/nova:core';

const specificPostResolvers = {
  Mutation: {
    increasePostViewCountBySlug(root, { slug }, context) {
      return context.Posts.update({slug: slug}, { $inc: { viewCount: 1 }});
    }
  }
};

GraphQLSchema.addResolvers(specificPostResolvers);
