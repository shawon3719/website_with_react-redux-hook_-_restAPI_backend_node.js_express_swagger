import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";

export const employeeService = {
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
    return fetch(`${apiUrl}employee/all`, requestOptions).then(handleResponse);
}
function create(employee, employeeImage) {
    console.log(employee)
    console.log(employeeImage)
    console.log(employeeImage.name)
    var formdata = new FormData();
    formdata.append("employee_id",employee.employee_id);
    formdata.append("full_name",employee.full_name);
    formdata.append("father_name",employee.father_name);
    formdata.append("mother_name",employee.mother_name);
    formdata.append("profile_photo", employeeImage, employeeImage.name);
    formdata.append("designation",employee.designation);
    formdata.append("nid",employee.nid);
    formdata.append("gender",employee.gender);
    formdata.append("date_of_birth",employee.date_of_birth);
    formdata.append("phone",employee.phone);
    formdata.append("email",employee.email);
    formdata.append("present_address",employee.present_address);
    formdata.append("permanent_address",employee.permanent_address);
    formdata.append("joining_date",employee.joining_date);
    formdata.append("employee_category",employee.employee_category);
    formdata.append("priority", employee.priority);
    formdata.append("created_by", employee.created_by);
    formdata.append("active_status", employee.active_status == true? 1 : 0);

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formdata,
        redirect: 'follow'
    };     

    return fetch(`${apiUrl}employee/create`, requestOptions).then(handleResponse);
}

function update(currentEmployee, employeeImage) {
    var formdata = new FormData();
    formdata.append("id", currentEmployee.id);
    formdata.append("title", currentEmployee.title);
    formdata.append("description", currentEmployee.description);
    formdata.append("image", employeeImage, employeeImage.name);
    formdata.append("priority", currentEmployee.priority);
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}employee/update`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}employee/employee/${id}`, requestOptions).then(handleResponse);
}

// const getById = id => {
//     return http.get(`employee-settings/employee/${id}`);
//   };


// function update(employee) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(employee)
//     };

//     return fetch(`${apiUrl}employees/${employee.id}`, requestOptions).then(handleResponse);;
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}employee/delete/${id}`, requestOptions).then(handleResponse);
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