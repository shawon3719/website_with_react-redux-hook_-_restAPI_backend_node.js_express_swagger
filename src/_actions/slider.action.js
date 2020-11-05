import { sliderConstants } from '../_constants';
import { sliderService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const sliderActions = {
    create,
    getAll,
    update,
    delete: _delete
};

function create(slider) {
    return dispatch => {
        dispatch(request(slider));

        sliderService.create(slider)
            .then(
                slider => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Slider Created Successfully..'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(slider) { return { type: sliderConstants.REGISTER_REQUEST, slider } }
    function success(slider) { return { type: sliderConstants.REGISTER_SUCCESS, slider } }
    function failure(error) { return { type: sliderConstants.REGISTER_FAILURE, error } }
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

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}