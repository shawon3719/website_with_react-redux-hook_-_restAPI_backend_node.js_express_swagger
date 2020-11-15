import { sliderConstants } from '../_constants/slider.constants';

export function sliders(state = {}, action) {
    switch (action.type) {
        case sliderConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case sliderConstants.GETALL_SUCCESS:
            return {
                items: action.sliders.data
            };
        case sliderConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case sliderConstants.CREATE_REQUEST:
            return { 
                ...state,
                slider: action.error ?
                    null :
                    (state.sliders || []).concat([action.slider]),
                    addOrUpdateStatus: "slider has been created successfully",
                submitting: true,
            };
        case sliderConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case sliderConstants.CREATE_FAILURE:
            return {};

        case sliderConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentSlider: state.items.map(slider =>
                slider.id === action.id
                    ? { ...slider }
                    : slider
            )
        };
        case sliderConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentSlider: state.items.filter(slider => slider.id === action.id)
            };
        case sliderConstants.GETBYID_FAILURE:
            return {};
        
        case sliderConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            slider: action.error ?
                null :
                (state.sliders || []).concat([action.slider]),
            addOrUpdateStatus: "slider has been updated successfully"
        };
        case sliderConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case sliderConstants.UPDATE_FAILURE:
            return {};
        case sliderConstants.DELETE_REQUEST:
            // add 'deleting:true' property to slider being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(slider =>
                    slider.id === action.id
                        ? { ...slider, deleting: true }
                        : slider
                )
            };
        case sliderConstants.DELETE_SUCCESS:
            // remove deleted slider from state
            return {
                items: state.items.filter(slider => slider.id !== action.id),
                deleteStatus: "slider has been deleted successfully"
            };
        case sliderConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to slider 
            return {
                ...state,
                items: state.items.map(slider => {
                    if (slider.id === action.id) {
                        // make copy of slider without 'deleting:true' property
                        const { deleting, ...sliderCopy } = slider;
                        // return copy of slider with 'deleteError:[error]' property
                        return { ...sliderCopy, deleteError: action.error };
                    }

                    return slider;
                })
            };
        default:
            return state
    }
}