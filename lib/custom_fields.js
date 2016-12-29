import Posts from "meteor/nova:posts";
import Categories from 'meteor/nova:categories'
import MatchIdField from './components/MatchIdField'
/*
Let's assign a color to each post (why? cause we want to, that's why).
We'll do that by adding a custom field to the Posts collection.
Note that this requires our custom package to depend on nova:posts and nova:users.
*/
Posts.addField(
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
        options: function () { // options for the select form control
          return [
            {value: "white", label: "White"},
            {value: "yellow", label: "Yellow"},
            {value: "blue", label: "Blue"},
            {value: "red", label: "Red"},
            {value: "green", label: "Green"}
          ];
        }
      },
    }
  }
);

Posts.addField(
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
        options: function () {
          return [
            {value: "link", label: "Link"},
            {value: "match", label: "Match"},
            {value: "video", label: "Video"}
          ]
        }
      },
    }
  }
)

Posts.addField(
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
  }
)

Categories.addField({
    fieldName: 'active',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
    }
})

Categories.addField({
    fieldName: 'categoryType',
    fieldSchema: {
      type: String,
      control: "select",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
      form: {
        options: function () {
          return [
            {value: "comp", label: "Competition"},
            {value: "team", label: "Team"},
            {value: "player", label: "Player"}
          ]
        }
      },
    },
})

Categories.addField(
  {
    fieldName: 'trnId',
    fieldSchema: {
      type: String,
      control: MatchIdField,
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['members'],
    }
  }
)
