import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";
import { isEmptyObject } from "jquery";

export const systemService = {
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
    return fetch(`${apiUrl}system-settings/all`, requestOptions).then(handleResponse);
}
function create(system, systemImage) {
    console.log(system)
    console.log(systemImage)
        var formdata = new FormData();
        formdata.append("systemName", system.systemName);
        formdata.append("title",system.title);
        formdata.append("system_logo", systemImage, systemImage.name);
        formdata.append("email", system.email);
        formdata.append("system_url", system.system_url);
        formdata.append("phone_no", system.phone_no);
        formdata.append("mobile", system.mobile);
        formdata.append("address", system.address);
        formdata.append("priority", system.priority);
        formdata.append("created_by", system.created_by);
        formdata.append("active_status", system.active_status == true? 1 : 0);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };     
    return fetch(`${apiUrl}system-settings/create`, requestOptions).then(handleResponse);
}

function update(currentSystem, systemImage) {
    var formdata = new FormData();
    formdata.append("id", currentSystem.id);
    if(!isEmptyObject(systemImage)){
        formdata.append("system_logo", systemImage, systemImage.name);
    }else{
        formdata.append("system_logo", currentSystem.system_logo);
    }
    formdata.append("systemName", currentSystem.systemName);
    formdata.append("title",currentSystem.title);
    formdata.append("email", currentSystem.email);
    formdata.append("system_url", currentSystem.system_url);
    formdata.append("phone_no", currentSystem.phone_no);
    formdata.append("mobile", currentSystem.mobile);
    formdata.append("address", currentSystem.address);
    formdata.append("priority", currentSystem.priority);
    formdata.append("updated_by", currentSystem.updated_by);
    formdata.append("active_status", currentSystem.active_status == true? 1 : 0);
    
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}system-settings/update`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}system-settings/system/${id}`, requestOptions).then(handleResponse);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}system-settings/delete/${id}`, requestOptions).then(handleResponse);
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