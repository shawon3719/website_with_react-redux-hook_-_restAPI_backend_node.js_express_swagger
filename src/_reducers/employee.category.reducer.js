import { employeeCategoryConstants } from '../_constants/employee.category.constants';

export function employeeCategories(state = {}, action) {
    switch (action.type) {
        case employeeCategoryConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case employeeCategoryConstants.GETALL_SUCCESS:
            return {
                items: action.employeeCategories.data.sort((a,b) => a.priority - b.priority)
            };
        case employeeCategoryConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case employeeCategoryConstants.CREATE_REQUEST:
            return { 
                ...state,
                employeeCategory: action.error ?
                    null :
                    (state.employeeCategories || []).concat([action.employeeCategory]),
                    addOrUpdateStatus: "Employee Category has been created successfully",
                submitting: true,
            };
        case employeeCategoryConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case employeeCategoryConstants.CREATE_FAILURE:
            return {};

        case employeeCategoryConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentEmployeeCategory: state.items.map(employeeCategory =>
                employeeCategory.id === action.id
                    ? { ...employeeCategory }
                    : employeeCategory
            )
        };
        case employeeCategoryConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentEmployeeCategory: state.items.filter(employeeCategory => employeeCategory.id === action.id)
            };
        case employeeCategoryConstants.GETBYID_FAILURE:
            return {};
        
        case employeeCategoryConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            employeeCategory: action.error ?
                null :
                (state.employeeCategories || []).concat([action.employeeCategory]),
            addOrUpdateStatus: "employeeCategory has been updated successfully"
        };
        case employeeCategoryConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case employeeCategoryConstants.UPDATE_FAILURE:
            return {};
        case employeeCategoryConstants.DELETE_REQUEST:
            // add 'deleting:true' property to employeeCategory being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(employeeCategory =>
                    employeeCategory.id === action.id
                        ? { ...employeeCategory, deleting: true }
                        : employeeCategory
                )
            };
        case employeeCategoryConstants.DELETE_SUCCESS:
            // remove deleted employeeCategory from state
            return {
                items: state.items.filter(employeeCategory => employeeCategory.id !== action.id),
                deleteStatus: "employeeCategory has been deleted successfully"
            };
        case employeeCategoryConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to employeeCategory 
            return {
                ...state,
                items: state.items.map(employeeCategory => {
                    if (employeeCategory.id === action.id) {
                        // make copy of employeeCategory without 'deleting:true' property
                        const { deleting, ...employeeCategoryCopy } = employeeCategory;
                        // return copy of employeeCategory with 'deleteError:[error]' property
                        return { ...employeeCategoryCopy, deleteError: action.error };
                    }

                    return employeeCategory;
                })
            };
        default:
            return state
    }
}