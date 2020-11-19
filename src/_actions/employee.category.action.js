import { employeeCategoryConstants } from '../_constants/employee.category.constants';
import { employeeCategoryService } from '../_services/employee.category.service';
import { alertActions } from '.';
import { history } from '../_helpers';

export const employeeCategoryActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        employeeCategoryService.getAll()
            .then(
                
                employeeCategories => dispatch(success(employeeCategories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeCategoryConstants.GETALL_REQUEST } }
    function success(employeeCategories) { return { type: employeeCategoryConstants.GETALL_SUCCESS, employeeCategories } }
    function failure(error) { return { type: employeeCategoryConstants.GETALL_FAILURE, error } }
}

function create(employeeCategory, employeeCategoryImage) {
    return dispatch => {
        dispatch(request(employeeCategory, employeeCategoryImage));
        employeeCategoryService.create(employeeCategory, employeeCategoryImage)
            .then(
                employeeCategory => { 
                    dispatch(success());
                    dispatch(alertActions.success('EmployeeCategory has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(employeeCategory, employeeCategoryImage) { return { type: employeeCategoryConstants.CREATE_REQUEST, employeeCategory, employeeCategoryImage } }
    function success(employeeCategory, employeeCategoryImage) { return { type: employeeCategoryConstants.CREATE_SUCCESS, employeeCategory, employeeCategoryImage } }
    function failure(error) { return { type: employeeCategoryConstants.CREATE_FAILURE, error } }
}


function update(currentEmployeeCategory, employeeCategoryImage) {
    return dispatch => {
        dispatch(request(currentEmployeeCategory, employeeCategoryImage));
        employeeCategoryService.update(currentEmployeeCategory, employeeCategoryImage)
            .then(
                employeeCategory => { 
                    dispatch(success());
                    // history.push('/#/employeeCategories');
                    dispatch(alertActions.success('EmployeeCategory has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentEmployeeCategory, employeeCategoryImage) { return { type: employeeCategoryConstants.UPDATE_REQUEST, currentEmployeeCategory, employeeCategoryImage } }
    function success(currentEmployeeCategory, employeeCategoryImage) { return { type: employeeCategoryConstants.UPDATE_SUCCESS, currentEmployeeCategory, employeeCategoryImage } }
    function failure(error) { return { type: employeeCategoryConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));
        employeeCategoryService.getById(id)
            .then(
                employeeCategory => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: employeeCategoryConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: employeeCategoryConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: employeeCategoryConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        employeeCategoryService.delete(id)
            .then(
                employeeCategory => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: employeeCategoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: employeeCategoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: employeeCategoryConstants.DELETE_FAILURE, id, error } }
}