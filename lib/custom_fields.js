import Posts from "meteor/nova:posts";
import Categories from 'meteor/nova:categories'
//import { Components } from 'meteor/nova:core'
import MatchIdField from './components/MatchIdField'
/*
Let's assign a color to each post (why? cause we want to, that's why).
We'll do that by adding a custom field to the Posts collection.
Note that this requires our custom package to depend on nova:posts and nova:users.
*/
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
      control: MatchIdField,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
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
        options: () => ([
          {value: "comp", label: "Competition"},
          {value: "team", label: "Team"},
          {value: "player", label: "Player"},
          {value: "normal", label: "Normal"},
        ]),
      },
    },
  },
  {
    fieldName: 'trnId',
    fieldSchema: {
      type: String,
      //control: Components.MatchIdField,
      control: "text",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
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
    }
  },
  {
    fieldName: 'attachedTeams',
    fieldSchema: {
      type: [String],
      control: "text",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
    }
  },
]);
