import { employeeConstants } from '../_constants/employee.constants';
import { employeeService } from '../_services/employee.service';
import { alertActions } from '.';
import { history } from '../_helpers';

export const employeeActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        employeeService.getAll()
            .then(
                
                employees => dispatch(success(employees)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.GETALL_REQUEST } }
    function success(employees) { return { type: employeeConstants.GETALL_SUCCESS, employees } }
    function failure(error) { return { type: employeeConstants.GETALL_FAILURE, error } }
}

function create(employee, employeeImage) {
    return dispatch => {
        dispatch(request(employee, employeeImage));
        employeeService.create(employee, employeeImage)
            .then(
                employee => { 
                    dispatch(success());
                    dispatch(alertActions.success('Employee has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(employee, employeeImage) { return { type: employeeConstants.CREATE_REQUEST, employee, employeeImage } }
    function success(employee, employeeImage) { return { type: employeeConstants.CREATE_SUCCESS, employee, employeeImage } }
    function failure(error) { return { type: employeeConstants.CREATE_FAILURE, error } }
}


function update(currentEmployee, employeeImage) {
    return dispatch => {
        dispatch(request(currentEmployee, employeeImage));
        employeeService.update(currentEmployee, employeeImage)
            .then(
                employee => { 
                    dispatch(success());
                    // history.push('/#/employees');
                    dispatch(alertActions.success('Employee has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentEmployee, employeeImage) { return { type: employeeConstants.UPDATE_REQUEST, currentEmployee, employeeImage } }
    function success(currentEmployee, employeeImage) { return { type: employeeConstants.UPDATE_SUCCESS, currentEmployee, employeeImage } }
    function failure(error) { return { type: employeeConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));
        employeeService.getById(id)
            .then(
                employee => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: employeeConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: employeeConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: employeeConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        employeeService.delete(id)
            .then(
                employee => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: employeeConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: employeeConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: employeeConstants.DELETE_FAILURE, id, error } }
}