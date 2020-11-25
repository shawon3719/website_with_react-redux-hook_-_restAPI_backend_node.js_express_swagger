import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";

export const employeeCategoryService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}employee-category/all`, requestOptions).then(handleResponse);
}
function create(employeeCategory) {
    let token = JSON.parse(localStorage.getItem('token'));
    var raw = JSON.stringify({"category_name":employeeCategory.category_name,"priority":employeeCategory.priority,"active_status":employeeCategory.active_status == true? 1 : 0, "created_by":employeeCategory.created_by});
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' +token },
        body: raw
    };    
    return fetch(`${apiUrl}employee-category/create`, requestOptions).then(handleResponse);
}

function update(currentEmployeeCategory) {
    let token = JSON.parse(localStorage.getItem('token'));
    var raw = JSON.stringify({"id":currentEmployeeCategory.id,"category_name":currentEmployeeCategory.category_name,"priority":currentEmployeeCategory.priority,"active_status":currentEmployeeCategory.active_status == true? 1 : 0,"updated_by":currentEmployeeCategory.updated_by});
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' +token },
      body: raw,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}employee-category/update`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}employee-category/employeeCategory/${id}`, requestOptions).then(handleResponse);
}

// const getById = id => {
//     return http.get(`employeeCategory-settings/employeeCategory/${id}`);
//   };


// function update(employeeCategory) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(employeeCategory)
//     };

//     return fetch(`${apiUrl}employeeCategories/${employeeCategory.id}`, requestOptions).then(handleResponse);;
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}employee-category/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}