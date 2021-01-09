import { systemConstants } from '../_constants/system.constants';

export function systems(state = {}, action) {
    switch (action.type) {
        case systemConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case systemConstants.GETALL_SUCCESS:
            return {
                items: action.systems.data.sort((a,b) => a.priority - b.priority)
            };
        case systemConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case systemConstants.CREATE_REQUEST:
            return { 
                ...state,
                system: action.error ?
                    null :
                    (state.systems || []).concat([action.system]),
                    addOrUpdateStatus: "system has been created successfully",
                submitting: true,
            };
        case systemConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case systemConstants.CREATE_FAILURE:
            return {};

        case systemConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentSystem: state.items.map(system =>
                system.id === action.id
                    ? { ...system }
                    : system
            )
        };
        case systemConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentSystem: state.items.filter(system => system.id === action.id)
            };
        case systemConstants.GETBYID_FAILURE:
            return {};
        
        case systemConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            system: action.error ?
                null :
                (state.systems || []).concat([action.system]),
            addOrUpdateStatus: "system has been updated successfully"
        };
        case systemConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case systemConstants.UPDATE_FAILURE:
            return {};
        case systemConstants.DELETE_REQUEST:
            // add 'deleting:true' property to system being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(system =>
                    system.id === action.id
                        ? { ...system, deleting: true }
                        : system
                )
            };
        case systemConstants.DELETE_SUCCESS:
            // remove deleted system from state
            return {
                items: state.items.filter(system => system.id !== action.id),
                deleteStatus: "system has been deleted successfully"
            };
        case systemConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to system 
            return {
                ...state,
                items: state.items.map(system => {
                    if (system.id === action.id) {
                        // make copy of system without 'deleting:true' property
                        const { deleting, ...systemCopy } = system;
                        // return copy of system with 'deleteError:[error]' property
                        return { ...systemCopy, deleteError: action.error };
                    }

                    return system;
                })
            };
        default:
            return state
    }
}