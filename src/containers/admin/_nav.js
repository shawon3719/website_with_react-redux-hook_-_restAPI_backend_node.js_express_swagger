import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin-index',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Configuration']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Configuration',
    route: '/configuration',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'System Setting',
        to: '/system-settings',
      },
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Base Setup']
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Page Setup',
  //   to: '/page-setup',
  //   icon: 'cil-star',
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Academic Setup',
  //   route: '/academic',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Program Setup',
  //       to: '/employee-category',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Course Setup',
  //       to: 'all-employee',
  //     },
  //   ],
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Notice Setup',
    to: '/notice-setup',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar Settings',
    to: '/calendar-settings',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employee Settings',
    route: '/employee',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Category',
        to: '/employee-category',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Manage Employee',
        to: 'all-employee',
      },
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Slider Setup',
    to: '/sliders',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Gallery Setup',
    to: '/galleries',
    icon: 'cil-star',
  },
]

