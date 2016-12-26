/*
A new custom route for our custom page.
Browse to http://localhost:3000/my-custom-route to see it.
*/

import Telescope from 'meteor/nova:lib';
import AdminPage from './components/admin/AdminPage.jsx';

Telescope.routes.add({name:"adminRoute", path:"/admin", component:AdminPage});
