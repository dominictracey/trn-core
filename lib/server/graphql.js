import { GraphQLSchema } from 'meteor/nova:core';

const resolver = {
  Category: {
    attachedTeams(category, args, context) {
      return category.type === 'comp' && category.attachedTeams && category.attachedTeams.length 
      ? context.Categories.find({trnId: {$in: category.attachedTeams} }, { fields: context.getViewableFields(context.currentUser, context.Categories) }).fetch() 
      : null;
    },
  },
};
GraphQLSchema.addResolvers(resolver);
