import { systemConstants } from '../_constants/system.constants';
import { systemService } from '../_services/system.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const systemActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        systemService.getAll()
            .then(
                
                systems => dispatch(success(systems)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: systemConstants.GETALL_REQUEST } }
    function success(systems) { return { type: systemConstants.GETALL_SUCCESS, systems } }
    function failure(error) { return { type: systemConstants.GETALL_FAILURE, error } }
}

function create(system, systemImage) {
    return dispatch => {
        dispatch(request(system, systemImage));
        systemService.create(system, systemImage)
            .then(
                system => { 
                    dispatch(success());
                    dispatch(alertActions.success('System has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(system, systemImage) { return { type: systemConstants.CREATE_REQUEST, system, systemImage } }
    function success(system, systemImage) { return { type: systemConstants.CREATE_SUCCESS, system, systemImage } }
    function failure(error) { return { type: systemConstants.CREATE_FAILURE, error } }
}


function update(currentSystem, systemImage) {
    return dispatch => {
        dispatch(request(currentSystem, systemImage));
        systemService.update(currentSystem, systemImage)
            .then(
                system => { 
                    dispatch(success());
                    // history.push('/#/systems');
                    dispatch(alertActions.success('System has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentSystem, systemImage) { return { type: systemConstants.UPDATE_REQUEST, currentSystem, systemImage } }
    function success(currentSystem, systemImage) { return { type: systemConstants.UPDATE_SUCCESS, currentSystem, systemImage } }
    function failure(error) { return { type: systemConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        systemService.getById(id)
            .then(
                system => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: systemConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: systemConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: systemConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        systemService.delete(id)
            .then(
                system => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: systemConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: systemConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: systemConstants.DELETE_FAILURE, id, error } }
}