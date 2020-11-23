import { noticeConstants } from '../_constants/notice.constants';
import { noticeService } from '../_services/notice.service';
import { alertActions } from '.';
import { history } from '../_helpers';

export const noticeActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        noticeService.getAll()
            .then(
                
                notices => dispatch(success(notices)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: noticeConstants.GETALL_REQUEST } }
    function success(notices) { return { type: noticeConstants.GETALL_SUCCESS, notices } }
    function failure(error) { return { type: noticeConstants.GETALL_FAILURE, error } }
}

function create(notice, noticeImage) {
    return dispatch => {
        dispatch(request(notice, noticeImage));
        noticeService.create(notice, noticeImage)
            .then(
                notice => { 
                    dispatch(success());
                    history.push('/#/notices');
                    dispatch(alertActions.success('Notice has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(notice, noticeImage) { return { type: noticeConstants.CREATE_REQUEST, notice, noticeImage } }
    function success(notice, noticeImage) { return { type: noticeConstants.CREATE_SUCCESS, notice, noticeImage } }
    function failure(error) { return { type: noticeConstants.CREATE_FAILURE, error } }
}


function update(currentNotice, noticeImage) {
    return dispatch => {
        dispatch(request(currentNotice, noticeImage));
        noticeService.update(currentNotice, noticeImage)
            .then(
                notice => { 
                    dispatch(success());
                    // history.push('/#/notices');
                    dispatch(alertActions.success('Notice has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentNotice, noticeImage) { return { type: noticeConstants.UPDATE_REQUEST, currentNotice, noticeImage } }
    function success(currentNotice, noticeImage) { return { type: noticeConstants.UPDATE_SUCCESS, currentNotice, noticeImage } }
    function failure(error) { return { type: noticeConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));
        noticeService.getById(id)
            .then(
                system => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: noticeConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: noticeConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: noticeConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        noticeService.delete(id)
            .then(
                notice => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: noticeConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: noticeConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: noticeConstants.DELETE_FAILURE, id, error } }
}