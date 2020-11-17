import { calendarConstants } from '../_constants/calendar.constants';

export function calendars(state = {}, action) {
    switch (action.type) {
        case calendarConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case calendarConstants.GETALL_SUCCESS:
            return {
                items: action.calendars.data.sort((a,b) => a.priority - b.priority)
            };
        case calendarConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case calendarConstants.CREATE_REQUEST:
            return { 
                ...state,
                calendar: action.error ?
                    null :
                    (state.calendars || []).concat([action.calendar]),
                    addOrUpdateStatus: "calendar has been created successfully",
                submitting: true,
            };
        case calendarConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case calendarConstants.CREATE_FAILURE:
            return {};

        case calendarConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentCalendar: state.items.map(calendar =>
                calendar.id === action.id
                    ? { ...calendar }
                    : calendar
            )
        };
        case calendarConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentCalendar: state.items.filter(calendar => calendar.id === action.id)
            };
        case calendarConstants.GETBYID_FAILURE:
            return {};
        
        case calendarConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            calendar: action.error ?
                null :
                (state.calendars || []).concat([action.calendar]),
            addOrUpdateStatus: "calendar has been updated successfully"
        };
        case calendarConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case calendarConstants.UPDATE_FAILURE:
            return {};
        case calendarConstants.DELETE_REQUEST:
            // add 'deleting:true' property to calendar being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(calendar =>
                    calendar.id === action.id
                        ? { ...calendar, deleting: true }
                        : calendar
                )
            };
        case calendarConstants.DELETE_SUCCESS:
            // remove deleted calendar from state
            return {
                items: state.items.filter(calendar => calendar.id !== action.id),
                deleteStatus: "calendar has been deleted successfully"
            };
        case calendarConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to calendar 
            return {
                ...state,
                items: state.items.map(calendar => {
                    if (calendar.id === action.id) {
                        // make copy of calendar without 'deleting:true' property
                        const { deleting, ...calendarCopy } = calendar;
                        // return copy of calendar with 'deleteError:[error]' property
                        return { ...calendarCopy, deleteError: action.error };
                    }

                    return calendar;
                })
            };
        default:
            return state
    }
}