import Posts from "meteor/nova:posts";
import Categories from 'meteor/nova:categories';
import { Components } from 'meteor/nova:core';

Posts.addField([
  {
    fieldName: 'color',
    fieldSchema: {
      type: String,
      control: "select", // use a select form control
      optional: true, // this field is not required
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: () => ([
          {value: "white", label: "White"},
          {value: "yellow", label: "Yellow"},
          {value: "blue", label: "Blue"},
          {value: "red", label: "Red"},
          {value: "green", label: "Green"}
        ]),
      },
    },
  },
  {
    fieldName: 'postType',
    fieldSchema: {
      type: String,
      control: "select",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: () => ([
          {value: "link", label: "Link"},
          {value: "match", label: "Match"},
          {value: "video", label: "Video"}
        ]),
      },
    },
  },
  {
    fieldName: 'trnId',
    fieldSchema: {
      type: String,
      control: Components.MatchIdField,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
    }
  },
  {
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      control: Components.PostsCategoriesSelectorWrapper,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      form: {
        noselect: true,
        type: "bootstrap-category",
        order: 50,
        options: function (formProps) {

          // catch the ApolloClient from the form props
          const {client} = formProps;

          // get the current data of the store
          const apolloData = client.store.getState().apollo.data;
          
          // filter these data based on their typename: we are interested in the categories data
          const categories = _.filter(apolloData, (object, key) => {
            return object.__typename === 'Category'
          });

          // give the form component (here: checkboxgroup) exploitable data
          const categoriesOptions = categories.map(function (category) {
            return {
              value: category._id,
              name: category.name,
              type: category.type,
              attachedTeams: category.attachedTeams,
            };
          });

          return categoriesOptions;
        }
      },
      resolveAs: 'categories: [Category]'
    }
  },
])

Categories.addField([
  {
    fieldName: 'visible',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
    }
  },
  {
    fieldName: 'type',
    fieldSchema: {
      type: String,
      control: "select",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
      form: {
        options: () => Categories.availableTypes,
      },
    },
  },
  {
    fieldName: 'trnId',
    fieldSchema: {
      type: String,
      control: "text",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
      form: {
        disabled: true,
      }
    }
  },
  {
    fieldName: 'abbr',
    fieldSchema: {
      type: String,
      control: "text",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
      form: {
        disabled: true,
      }
    }
  },
  {
    fieldName: 'attachedTeams',
    fieldSchema: {
      type: [String],
      control: Components.CategoriesAttachedTeams,
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
      resolveAs: 'attachedTeams: [Category]',
    }
  },
]);
