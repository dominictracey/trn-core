import { addRoute } from 'meteor/nova:core';

addRoute({name:"adminRoute", path:"/admin", componentName: "CategoriesAdminPage"});
