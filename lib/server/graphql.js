import { GraphQLSchema } from 'meteor/nova:core';

GraphQLSchema.addQuery('commentsUsersList(terms: JSON): [Comment]');

const resolvers = {
  Category: {
    attachedTeams(category, args, context) {
      return category.type === 'comp' && category.attachedTeams && category.attachedTeams.length 
      ? context.Categories.find({trnId: {$in: category.attachedTeams} }, { fields: context.getViewableFields(context.currentUser, context.Categories) }).fetch() 
      : null;
    },
  },
  Query: {
    // note: total calculation could also be done there instead of directly in the component
    commentsUsersList(root, {terms}, context) {
      return terms.userId ? context.Comments.find({userId: terms.userId}, { fields: context.getViewableFields(context.currentUser, context.Comments) }).fetch() : [];
    },
  },
};
GraphQLSchema.addResolvers(resolvers);
