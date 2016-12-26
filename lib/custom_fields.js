import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Categories from 'meteor/nova:categories'
import MatchIdField from './components/MatchIdField'
/*
Let's assign a color to each post (why? cause we want to, that's why).
We'll do that by adding a custom field to the Posts collection.
Note that this requires our custom package to depend on nova:posts and nova:users.
*/

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Posts.addField(
  {
    fieldName: 'color',
    fieldSchema: {
      type: String,
      control: "select", // use a select form control
      optional: true, // this field is not required
      insertableIf: canInsert,
      editableIf: canEdit,
      form: {
        options: function () { // options for the select form control
          return [
            {value: "white", label: "White"},
            {value: "yellow", label: "Yellow"},
            {value: "blue", label: "Blue"},
            {value: "red", label: "Red"},
            {value: "green", label: "Green"},
            {value: "orange", label: "Orange"}
          ];
        }
      },
      publish: true // make that field public and send it to the client
    }
  }
)

Posts.addField(
  {
    fieldName: 'postType',
    fieldSchema: {
      type: String,
      control: "select",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      form: {
        options: function () {
          return [
            {value: "link", label: "Link"},
            {value: "match", label: "Match"},
            {value: "video", label: "Video"}
          ]
        }
      },
      publish: true,
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
      insertableIf: canInsert,
      editableIf: canEdit,
      publish: true,
    }
  }
)

Categories.addField({
    fieldName: 'active',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      publish: true,
    }
})

/*
The main post list view uses a special object to determine which fields to publish,
so we also add our new field to that object:
*/

import PublicationUtils from 'meteor/utilities:smart-publications';

// PublicationUtils.addToFields(Posts.publishedFields.list, ["color"]);
// PublicationUtils.addToFields(Posts.publishedFields.list, ["postType"]);
// PublicationUtils.addToFields(Posts.publishedFields.list, ["trnId"]);
