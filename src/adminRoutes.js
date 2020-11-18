import React from 'react';
import { HomePage } from './views/admin/pages/dashboard/Dashboard'
//admin Components
// const Dashboard = React.lazy(() => import('./views/admin/pages/dashboard/Dashboard'));
const NotFound  = React.lazy(() => import('./views/admin/page404/Page404'));
const Sliders  = React.lazy(() => import('./views/admin/pages/sliders/Sliders'));
const Pages  = React.lazy(() => import('./views/admin/pages/pageSetup/Pages'));
const System_Settings  = React.lazy(() => import('./views/admin/pages/systemSettings/system.settings'));
const Calendar_Settings  = React.lazy(() => import('./views/admin/pages/calendar/calendar.settings'));
const EmployeeCategory  = React.lazy(() => import('./views/admin/pages/employee/category/category'));
const AllEmployee  = React.lazy(() => import('./views/admin/pages/employee/employee_setup/employee'));

const routes = [
  // Admin routes
  { path: '/admin-index', exact: true, name: 'Admin Dashboard', component: HomePage },
  { path: '/admin-404', exact: true, name: 'Not Found', component: NotFound },
  { path: '/sliders', exact: true, name: 'Sliders', component: Sliders },
  { path: '/page-setup', exact: true, name: 'Pages', component: Pages },
  { path: '/system-settings', exact: true, name: 'System Settings', component: System_Settings },
  { path: '/calendar-settings', exact: true, name: 'Calendar Settings', component: Calendar_Settings },
  { path: '/employee-category', exact: true, name: 'Employee Category Settings', component: EmployeeCategory },
  { path: '/all-employee', exact: true, name: 'All Employee Settings', component: AllEmployee }
];

export default routes;
