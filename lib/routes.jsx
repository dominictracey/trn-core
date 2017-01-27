import { addRoute, getComponent } from 'meteor/nova:core';


addRoute({
  name: "postsRoutes",
  path: "/x/:slug",
  component: getComponent("PostsSingle"),
})

addRoute({
  name: "categoriesRoutes",
  path: "/:categoryType/:slug",
  component: getComponent("PostsHome"),
})

addRoute({
  name:"adminRoute",
  path:"/admin",
  component: getComponent("CategoriesAdminPage"),
})

addRoute({
  name:"welcome",
  path:"/welcome",
  component: getComponent("WelcomePage"),
})
