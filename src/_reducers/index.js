import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { sliders } from './sliders.reducer';
import { notices } from './notices.reducer';
import { galleries } from './galleries.reducer';
import { systems } from './system.reducer';
import { employees } from './employee.reducer';
import { calendars } from './calendar.reducer';
import { employeeCategories } from './employee.category.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    sliders,
    notices,
    galleries,
    systems,
    employees,
    employeeCategories,
    calendars,
    alert
});

export default rootReducer;