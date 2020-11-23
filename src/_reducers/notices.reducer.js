import { noticeConstants } from '../_constants/notice.constants';

export function notices(state = {}, action) {
    switch (action.type) {
        case noticeConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case noticeConstants.GETALL_SUCCESS:
            return {
                items: action.notices.data
            };
        case noticeConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case noticeConstants.CREATE_REQUEST:
            return { 
                ...state,
                notice: action.error ?
                    null :
                    (state.notices || []).concat([action.notice]),
                    addOrUpdateStatus: "notice has been created successfully",
                submitting: true,
            };
        case noticeConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case noticeConstants.CREATE_FAILURE:
            return {};

        case noticeConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentNotice: state.items.map(notice =>
                notice.id === action.id
                    ? { ...notice }
                    : notice
            )
        };
        case noticeConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentNotice: state.items.filter(notice => notice.id === action.id)
            };
        case noticeConstants.GETBYID_FAILURE:
            return {};
        
        case noticeConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            notice: action.error ?
                null :
                (state.notices || []).concat([action.notice]),
            addOrUpdateStatus: "notice has been updated successfully"
        };
        case noticeConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case noticeConstants.UPDATE_FAILURE:
            return {};
        case noticeConstants.DELETE_REQUEST:
            // add 'deleting:true' property to notice being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(notice =>
                    notice.id === action.id
                        ? { ...notice, deleting: true }
                        : notice
                )
            };
        case noticeConstants.DELETE_SUCCESS:
            // remove deleted notice from state
            return {
                items: state.items.filter(notice => notice.id !== action.id),
                deleteStatus: "notice has been deleted successfully"
            };
        case noticeConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to notice 
            return {
                ...state,
                items: state.items.map(notice => {
                    if (notice.id === action.id) {
                        // make copy of notice without 'deleting:true' property
                        const { deleting, ...noticeCopy } = notice;
                        // return copy of notice with 'deleteError:[error]' property
                        return { ...noticeCopy, deleteError: action.error };
                    }

                    return notice;
                })
            };
        default:
            return state
    }
}