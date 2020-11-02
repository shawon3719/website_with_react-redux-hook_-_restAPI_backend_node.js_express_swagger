import React from 'react';

//admin Components
const Dashboard = React.lazy(() => import('./views/admin/pages/dashboard/Dashboard'));
const NotFound  = React.lazy(() => import('./views/admin/page404/Page404'));
const Sliders  = React.lazy(() => import('./views/admin/pages/sliders/Sliders'));
const Pages  = React.lazy(() => import('./views/admin/pages/pageSetup/Pages'));

const routes = [
  // Admin routes
  { path: '/admin-index', exact: true, name: 'Admin Dashboard', component: Dashboard },
  { path: '/admin-404', exact: true, name: 'Not Found', component: NotFound },
  { path: '/sliders', exact: true, name: 'Sliders', component: Sliders },
  { path: '/page-setup', exact: true, name: 'Pages', component: Pages },


];

export default routes;
