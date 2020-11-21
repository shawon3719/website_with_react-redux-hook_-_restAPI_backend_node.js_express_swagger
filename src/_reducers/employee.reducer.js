import { employeeConstants } from '../_constants/employee.constants';

export function employees(state = {}, action) {
    switch (action.type) {
        case employeeConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case employeeConstants.GETALL_SUCCESS:
            return {
                items: action.employees.data.sort((a,b) => a.priority - b.priority)
            };
        case employeeConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case employeeConstants.CREATE_REQUEST:
            return { 
                ...state,
                employee: action.error ?
                    null :
                    (state.employees || []).concat([action.employee]),
                    addOrUpdateStatus: "employee has been created successfully",
                submitting: true,
            };
        case employeeConstants.CREATE_SUCCESS:
            return {
                    ...state,
            };
        case employeeConstants.CREATE_FAILURE:
            return {};

        case employeeConstants.GETBYID_REQUEST:
        return {
            ...state,
            currentEmployee: state.items.map(employee =>
                employee.id === action.id
                    ? { ...employee }
                    : employee
            )
        };
        case employeeConstants.GETBYID_SUCCESS:
            return {
                ...state,
                currentEmployee: state.items.filter(employee => employee.id === action.id)
            };
        case employeeConstants.GETBYID_FAILURE:
            return {};
        
        case employeeConstants.UPDATE_REQUEST:
        return { submitting: true,
            ...state,
            employee: action.error ?
                null :
                (state.employees || []).concat([action.employee]),
            addOrUpdateStatus: "employee has been updated successfully"
        };
        case employeeConstants.UPDATE_SUCCESS:
            return {
                    ...state,
            };
        case employeeConstants.UPDATE_FAILURE:
            return {};
        case employeeConstants.DELETE_REQUEST:
            // add 'deleting:true' property to employee being deleted
            return {
                ...state,
                deleting: true,
                items: state.items.map(employee =>
                    employee.id === action.id
                        ? { ...employee, deleting: true }
                        : employee
                )
            };
        case employeeConstants.DELETE_SUCCESS:
            // remove deleted employee from state
            return {
                items: state.items.filter(employee => employee.id !== action.id),
                deleteStatus: "employee has been deleted successfully"
            };
        case employeeConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to employee 
            return {
                ...state,
                items: state.items.map(employee => {
                    if (employee.id === action.id) {
                        // make copy of employee without 'deleting:true' property
                        const { deleting, ...employeeCopy } = employee;
                        // return copy of employee with 'deleteError:[error]' property
                        return { ...employeeCopy, deleteError: action.error };
                    }

                    return employee;
                })
            };
        default:
            return state
    }
}