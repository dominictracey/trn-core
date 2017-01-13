import { addRoute, Components } from 'meteor/nova:core';

addRoute({name:"adminRoute", path:"/admin", component:Components.CategoriesAdminPage});
