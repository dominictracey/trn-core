import { GraphQLSchema } from 'meteor/nova:core';

GraphQLSchema.addQuery('userTotalKarma(userId: String!, collectionType: String!): Float');

const resolvers = {
  Category: {
    attachedTeams(category, args, context) {
      return category.type === 'comp' && category.attachedTeams && category.attachedTeams.length 
      ? context.Categories.find({trnId: {$in: category.attachedTeams} }, { fields: context.getViewableFields(context.currentUser, context.Categories) }).fetch() 
      : null;
    },
  },
  Query: {
    userTotalKarma(root, {userId, collectionType}, context) {
      const userDocumentsList = context[collectionType].find({userId}, { fields: { upvotes: 1} }).fetch();
      // sum all upvotes on this collection user's documents
      return userDocumentsList.reduce((total, {upvotes = 0}) => total + upvotes, 0);
    },
  },
};
GraphQLSchema.addResolvers(resolvers);
