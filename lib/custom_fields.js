import Posts from "meteor/nova:posts";
import Categories from 'meteor/nova:categories';
import Users from "meteor/nova:users";
import Wires from 'meteor/xavcz:nova-wires';
import { getComponent, getSetting } from 'meteor/nova:core';

Posts.addField([
  {
    fieldName: 'title',
    fieldSchema: {
      max: 80, // max length is 80 characters
    }
  },
  {
    fieldName: 'url',
    fieldSchema: {
      control: getComponent('CustomEmbedlyURL'),
    }
  },
  {
    fieldName: 'color',
    fieldSchema: {
      type: String,
      control: "select", // use a select form control
      optional: true, // this field is not required
      insertableBy: ['mods'],
      editableBy: ['mods'],
      viewableBy: ['guests'],
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
      hidden: true,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['admins', 'mods'],
      viewableBy: ['guests'],
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
      control: getComponent('PostsMatchIdField'),
      optional: true,
      insertableBy: ['admins', 'mods'],
      editableBy: ['admins', 'mods'],
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      control: getComponent('PostsCategoriesSelectorWrapper'),
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

          // give the form component (here: checkboxgroup / tags) exploitable data
          const categoriesOptions = categories.map(({ _id, name, type, slug, attachedTeams}) => {

            if (attachedTeams && attachedTeams.length) {
              attachedTeams = attachedTeams.map(t => apolloData[t.id])
            }

            return {
              value: _id,
              name,
              type,
              slug,
              attachedTeams,
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
      viewableBy: ['guests'],
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
      viewableBy: ['guests'],
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
      viewableBy: ['guests'],
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
      viewableBy: ['guests'],
      form: {
        disabled: true,
      }
    }
  },
  {
    fieldName: 'attachedTeams',
    fieldSchema: {
      type: [String],
      control: getComponent('CategoriesAttachedTeams'),
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      resolveAs: 'attachedTeams: [Category]',
    }
  },
]);

Users.addField([
  {
    fieldName: 'avatar',
    fieldSchema: {
      type: String,
      optional: true,
      control: getComponent('Upload'),
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      //preload: true,
      form: {
        options: {
          preset: getSetting('cloudinaryPresets').avatar // this setting refers to the transformation you want to apply to the image
        },
      }
    }
  },
]);

Wires.addField([
  {
    fieldName: 'recipientId',
    fieldSchema: {
      hidden: true,
    },
  },
  {
    fieldName: 'reaction',
    fieldSchema: {
      type: String,
      control: 'radiogroup',
      insertableBy: ['members'],
      form: {
        options: __ => ([
          {value: 'happy', label: "I like that"},
          {value: 'sad', label: "I don't like that"},
          {value: 'mad', label: "This is annoying me!!"},
        ]),
      },
    },
  },
  // note: you already have the context to describe this data
  // {
  //   fieldName: 'parentComponentName',
  //   fieldSchema: {
  //     type: String,
  //     hidden: true,
  //     insertableBy: ['members'],
  //   },
  // },
  {
    fieldName: 'location',
      fieldSchema: {
      type: String,
      hidden: true,
      insertableBy: ['members'],
    },
  },
  {
    fieldName: 'context',
    fieldSchema: {
      type: String,
      hidden: true,
      insertableBy: ['members'],
    },
  },
]);
