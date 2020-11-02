import React from 'react';

const About = React.lazy(() => import('./views/about/About'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Gallery = React.lazy(() => import('./views/photoGallery/Gallery'));
const Courses = React.lazy(() => import('./views/courses/Courses'));
const Philosophy = React.lazy(() => import('./views/philosophy/Philosophy'));
const Facilities = React.lazy(() => import('./views/facilities/Facilities'));
const VisionAndMission = React.lazy(() => import('./views/visionAndMission/VisionAndMission'));
const PrincipleMessage = React.lazy(() => import('./views/principleMessage/PrincipleMessage'));
const Contact = React.lazy(() => import('./views/contact/Contact'));
const TeacherAndStuffs = React.lazy(() => import('./views/teachersAndStuffs/TeachersAndStuffs'));
const AdmissionProcedure = React.lazy(() => import('./views/admissionProcedure/AdmissionProcedure'));
const FeesAndCharges = React.lazy(() => import('./views/feesAndCharges/FeesAndCharges'));
const OutcomeOfCourses = React.lazy(() => import('./views/outcomeOfCourses/OutcomeOfCourses'));
const RulesAndDiscipline = React.lazy(() => import('./views/rulesAndDiscipline/RulesAndDiscipline'));
const DynamicPage = React.lazy(() => import('./views/dynamicPage/DynamicPage'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/about', exact: true, name: 'About', component: About  },
  { path: '/gallery', exact: true, name: 'Gallery', component: Gallery  },
  { path: '/courses', exact: true, name: 'Courses', component: Courses  },
  { path: '/philosophy', exact: true, name: 'Philosophy', component: Philosophy  },
  { path: '/facilities', exact: true, name: 'Facilities', component: Facilities  },
  { path: '/vision-and-mission', exact: true, name: 'Vision and Mission', component: VisionAndMission  },
  { path: '/message-of-principle', exact: true, name: 'Message of Principle', component: PrincipleMessage  },
  { path: '/contact', exact: true, name: 'Contact', component: Contact },
  { path: '/teachers-and-stuffs', exact: true, name: 'Teacher And Stuffs', component: TeacherAndStuffs },
  { path: '/admission-procedure', exact: true, name: 'Admission Procedure', component: AdmissionProcedure },
  { path: '/fees-and-charges', exact: true, name: 'Fees And Charges', component: FeesAndCharges },
  { path: '/outcome-of-courses', exact: true, name: 'Outcome Of Courses', component: OutcomeOfCourses },
  { path: '/rules-and-discipline', exact: true, name: 'Rules And Discipline', component: RulesAndDiscipline },
  { path: '/page/id=:id', exact: true, name: 'dynamic', component: DynamicPage },

];

export default routes;
