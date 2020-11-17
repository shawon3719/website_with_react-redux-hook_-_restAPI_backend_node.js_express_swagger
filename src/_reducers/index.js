import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { sliders } from './sliders.reducer';
import { systems } from './system.reducer';
import { calendars } from './calendar.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    sliders,
    systems,
    calendars,
    alert
});

export default rootReducer;