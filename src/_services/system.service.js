import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";

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
        var formdata = new FormData();
        formdata.append("title", system.title);
        formdata.append("description",system.description);
        formdata.append("image", systemImage, systemImage.name);
        formdata.append("created_by", system.created_by);
        formdata.append("priority", system.priority);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };


        // return fetch(apiUrl+"systems/create", requestOptions)
        //               .then(response => response.text())
        //               .then((response) => {
        //                 var obj = JSON.parse(response);
        //                   console.log(obj);
        //             })
        //               .catch(error => console.log('error', error));
        //   };
        
    return fetch(`${apiUrl}system-settings/create`, requestOptions).then(handleResponse);
}

function update(currentSystem, systemImage) {
    var formdata = new FormData();
    formdata.append("id", currentSystem.id);
    formdata.append("title", currentSystem.title);
    formdata.append("description", currentSystem.description);
    formdata.append("image", systemImage, systemImage.name);
    formdata.append("priority", currentSystem.priority);
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}system-settings/update`, requestOptions).then(handleResponse);
}

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//     return fetch(`${apiUrl}systems/system/${id}`, requestOptions).then(handleResponse);
// }

const getById = id => {
    return http.get(`system-settings/system/${id}`);
  };


// function update(system) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(system)
//     };

//     return fetch(`${apiUrl}systems/${system.id}`, requestOptions).then(handleResponse);;
// }

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