import { addRoute, getComponent } from 'meteor/nova:core';

addRoute({name:"adminRoute", path:"/admin", component: getComponent("CategoriesAdminPage")});
