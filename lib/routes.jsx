import { addRoute, getComponent } from 'meteor/vulcan:core';


addRoute({
  name: "postsRoutes",
  path: "/x/:slug",
  component: getComponent("PostsSingle"),
})

addRoute({
  name: "matchPlayerStatsRoutes",
  path: "/x/:slug/stats/:statsType",
  component: getComponent("PostsMatchStats"),
})

addRoute({
  name: "categoriesRoutes",
  path: "/:categoryType/:slug",
  component: getComponent("PostsHome"),
})

addRoute({
  name: "users.single",
  path: "u/:slug",
  component: getComponent("UsersSingle"),
})
//{name:'users.single',   path:'users/:slug',           componentName: 'UsersSingle'},
addRoute({
  name: "users.edit",
  path: "u/:slug/edit",
  component: getComponent("UsersAccount"),
})
//{name:'users.edit',     path:'users/:slug/edit',      componentName: 'UsersAccount'},
addRoute({
  name:"adminRoute",
  path:"/admin",
  component: getComponent("CategoriesAdminPage"),
})

addRoute({
  name:"trophiesRoute",
  path:"/trophies",
  component: getComponent("UsersTrophiesAdminList"),
})

addRoute({
  name:"welcome",
  path:"/welcome",
  component: getComponent("WelcomePage"),
})
