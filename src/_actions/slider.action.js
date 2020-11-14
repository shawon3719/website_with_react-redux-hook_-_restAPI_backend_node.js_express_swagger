import { sliderConstants } from '../_constants/slider.constants';
import { sliderService } from '../_services/slider.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const sliderActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        sliderService.getAll()
            .then(
                
                sliders => dispatch(success(sliders)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: sliderConstants.GETALL_REQUEST } }
    function success(sliders) { return { type: sliderConstants.GETALL_SUCCESS, sliders } }
    function failure(error) { return { type: sliderConstants.GETALL_FAILURE, error } }
}

function create(slider, sliderImage) {
    return dispatch => {
        dispatch(request(slider, sliderImage));
        sliderService.create(slider, sliderImage)
            .then(
                slider => { 
                    dispatch(success());
                    history.push('/#/sliders');
                    dispatch(alertActions.success('Slider has been created successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(slider, sliderImage) { return { type: sliderConstants.CREATE_REQUEST, slider, sliderImage } }
    function success(slider, sliderImage) { return { type: sliderConstants.CREATE_SUCCESS, slider, sliderImage } }
    function failure(error) { return { type: sliderConstants.CREATE_FAILURE, error } }
}


function update(currentSlider, sliderImage) {
    return dispatch => {
        dispatch(request(currentSlider, sliderImage));
        sliderService.update(currentSlider, sliderImage)
            .then(
                slider => { 
                    dispatch(success());
                    // history.push('/#/sliders');
                    dispatch(alertActions.success('Slider has been updated successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(currentSlider, sliderImage) { return { type: sliderConstants.UPDATE_REQUEST, currentSlider, sliderImage } }
    function success(currentSlider, sliderImage) { return { type: sliderConstants.UPDATE_SUCCESS, currentSlider, sliderImage } }
    function failure(error) { return { type: sliderConstants.UPDATE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        sliderService.getById(id)
            .then(
                slider => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: sliderConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: sliderConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: sliderConstants.GETBYID_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        sliderService.delete(id)
            .then(
                slider => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
            return success(id)
    };

    function request(id) { return { type: sliderConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: sliderConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: sliderConstants.DELETE_FAILURE, id, error } }
}