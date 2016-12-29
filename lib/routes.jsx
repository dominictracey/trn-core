import { addRoute } from 'meteor/nova:core';

import AdminPage from './components/admin/AdminPage.jsx';

addRoute({name:"adminRoute", path:"/admin", component:AdminPage});
