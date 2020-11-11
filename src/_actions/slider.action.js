import { sliderConstants } from '../_constants/slider.constants';
import { sliderService } from '../_services/slider.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const sliderActions = {
    create,
    getAll,
    delete: _delete
};

function create(slider, sliderImage) {
    return dispatch => {
        dispatch(request(slider, sliderImage));
        sliderService.create(slider, sliderImage)
            .then(
                slider => { 
                    dispatch(success());
                    history.push('/#/slider');
                    getAll();
                    dispatch(alertActions.success('Slider Created Successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(slider) { return { type: sliderConstants.CREATE_REQUEST, slider } }
    function success(slider) { return { type: sliderConstants.CREATE_SUCCESS, slider } }
    function failure(error) { return { type: sliderConstants.CREATE_FAILURE, error } }
}

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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        sliderService.delete(id)
            .then(
                slider => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: sliderConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: sliderConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: sliderConstants.DELETE_FAILURE, id, error } }
}