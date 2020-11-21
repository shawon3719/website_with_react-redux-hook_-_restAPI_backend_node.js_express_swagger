import { galleryConstants } from '../_constants/gallery.constants';

export function galleries(state = {}, action) {
    switch (action.type) {
        case galleryConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case galleryConstants.GETALL_SUCCESS:
            return {
                items: action.galleries.data
            };
        case galleryConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case galleryConstants.CREATE_REQUEST:
            return { 
                ...state,
                gallery: action.error ?
                    null :
                    (state.galleries || []).concat([action.gallery]),
                    addOrUpdateStatus: "gallery has been created successfully",
                submitting: true,
            };
        case galleryConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case galleryConstants.CREATE_FAILURE:
            return {};

        case galleryConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentGallery: state.items.map(gallery =>
                gallery.id === action.id
                    ? { ...gallery }
                    : gallery
            )
        };
        case galleryConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentGallery: state.items.filter(gallery => gallery.id === action.id)
            };
        case galleryConstants.GETBYID_FAILURE:
            return {};
        
        case galleryConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            gallery: action.error ?
                null :
                (state.galleries || []).concat([action.gallery]),
            addOrUpdateStatus: "gallery has been updated successfully"
        };
        case galleryConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case galleryConstants.UPDATE_FAILURE:
            return {};
        case galleryConstants.DELETE_REQUEST:
            // add 'deleting:true' property to gallery being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(gallery =>
                    gallery.id === action.id
                        ? { ...gallery, deleting: true }
                        : gallery
                )
            };
        case galleryConstants.DELETE_SUCCESS:
            // remove deleted gallery from state
            return {
                items: state.items.filter(gallery => gallery.id !== action.id),
                deleteStatus: "gallery has been deleted successfully"
            };
        case galleryConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to gallery 
            return {
                ...state,
                items: state.items.map(gallery => {
                    if (gallery.id === action.id) {
                        // make copy of gallery without 'deleting:true' property
                        const { deleting, ...galleryCopy } = gallery;
                        // return copy of gallery with 'deleteError:[error]' property
                        return { ...galleryCopy, deleteError: action.error };
                    }

                    return gallery;
                })
            };
        default:
            return state
    }
}