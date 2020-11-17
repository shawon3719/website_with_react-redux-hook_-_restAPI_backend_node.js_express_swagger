import { calendarConstants } from '../_constants/calendar.constants';
import { calendarService } from '../_services/calendar.service';
import { alertActions } from '.';
import { history } from '../_helpers';

export const calendarActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        calendarService.getAll()
            .then(
                
                calendars => dispatch(success(calendars)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: calendarConstants.GETALL_REQUEST } }
    function success(calendars) { return { type: calendarConstants.GETALL_SUCCESS, calendars } }
    function failure(error) { return { type: calendarConstants.GETALL_FAILURE, error } }
}

function create(calendar, calendarImage) {
    return dispatch => {
        dispatch(request(calendar, calendarImage));
        calendarService.create(calendar, calendarImage)
            .then(
                calendar => { 
                    dispatch(success());
                    dispatch(alertActions.success('Calendar has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(calendar, calendarImage) { return { type: calendarConstants.CREATE_REQUEST, calendar, calendarImage } }
    function success(calendar, calendarImage) { return { type: calendarConstants.CREATE_SUCCESS, calendar, calendarImage } }
    function failure(error) { return { type: calendarConstants.CREATE_FAILURE, error } }
}


function update(currentCalendar, calendarImage) {
    return dispatch => {
        dispatch(request(currentCalendar, calendarImage));
        calendarService.update(currentCalendar, calendarImage)
            .then(
                calendar => { 
                    dispatch(success());
                    // history.push('/#/calendars');
                    dispatch(alertActions.success('Calendar has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentCalendar, calendarImage) { return { type: calendarConstants.UPDATE_REQUEST, currentCalendar, calendarImage } }
    function success(currentCalendar, calendarImage) { return { type: calendarConstants.UPDATE_SUCCESS, currentCalendar, calendarImage } }
    function failure(error) { return { type: calendarConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));
        calendarService.getById(id)
            .then(
                calendar => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: calendarConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: calendarConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: calendarConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        calendarService.delete(id)
            .then(
                calendar => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: calendarConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: calendarConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: calendarConstants.DELETE_FAILURE, id, error } }
}