import { galleryConstants } from '../_constants/gallery.constants';
import { galleryService } from '../_services/gallery.service';
import { alertActions } from '.';
import { history } from '../_helpers';

export const galleryActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        galleryService.getAll()
            .then(
                
                galleries => dispatch(success(galleries)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: galleryConstants.GETALL_REQUEST } }
    function success(galleries) { return { type: galleryConstants.GETALL_SUCCESS, galleries } }
    function failure(error) { return { type: galleryConstants.GETALL_FAILURE, error } }
}

function create(gallery, galleryImage) {
    return dispatch => {
        dispatch(request(gallery, galleryImage));
        galleryService.create(gallery, galleryImage)
            .then(
                gallery => { 
                    dispatch(success());
                    dispatch(alertActions.success('Gallery has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(gallery, galleryImage) { return { type: galleryConstants.CREATE_REQUEST, gallery, galleryImage } }
    function success(gallery, galleryImage) { return { type: galleryConstants.CREATE_SUCCESS, gallery, galleryImage } }
    function failure(error) { return { type: galleryConstants.CREATE_FAILURE, error } }
}


function update(currentGallery, galleryImage) {
    return dispatch => {
        dispatch(request(currentGallery, galleryImage));
        galleryService.update(currentGallery, galleryImage)
            .then(
                gallery => { 
                    dispatch(success());
                    // history.push('/#/galleries');
                    dispatch(alertActions.success('Gallery has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentGallery, galleryImage) { return { type: galleryConstants.UPDATE_REQUEST, currentGallery, galleryImage } }
    function success(currentGallery, galleryImage) { return { type: galleryConstants.UPDATE_SUCCESS, currentGallery, galleryImage } }
    function failure(error) { return { type: galleryConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        galleryService.getById(id)
            .then(
                gallery => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: galleryConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: galleryConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: galleryConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        galleryService.delete(id)
            .then(
                gallery => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: galleryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: galleryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: galleryConstants.DELETE_FAILURE, id, error } }
}