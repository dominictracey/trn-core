import { addRoute, getComponent } from 'meteor/nova:core';

addRoute({
  name: "categoriesRoutes",
  path: "/:categoryType/:slug",
  component: getComponent("PostsHome"),
});

addRoute({
  name:"adminRoute",
  path:"/admin",
  component: getComponent("CategoriesAdminPage"),
});
