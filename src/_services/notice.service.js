import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";

export const noticeService = {
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
    return fetch(`${apiUrl}notices/all`, requestOptions).then(handleResponse);
}
function create(notice, noticeImage) {
        var formdata = new FormData();
        formdata.append("title", notice.title);
        formdata.append("description",notice.description);
        formdata.append("image", noticeImage, noticeImage.name);
        formdata.append("created_by", notice.created_by);
        formdata.append("priority", notice.priority);
        formdata.append("active_status", notice.active_status == true ? 1 :0);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };
        
    return fetch(`${apiUrl}notices/create`, requestOptions).then(handleResponse);
}

function update(currentNotice, noticeImage) {
    var formdata = new FormData();
    formdata.append("id", currentNotice.id);
    formdata.append("title", currentNotice.title);
    formdata.append("description", currentNotice.description);
    formdata.append("image", noticeImage, noticeImage.name);
    formdata.append("priority", currentNotice.priority);
    formdata.append("active_status", currentNotice.active_status == true ? 1 :0);
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}notices/update`, requestOptions).then(handleResponse);
}

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//     return fetch(`${apiUrl}notices/notice/${id}`, requestOptions).then(handleResponse);
// }

const getById = id => {
    return http.get(`notices/notice/${id}`);
  };


// function update(notice) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(notice)
//     };

//     return fetch(`${apiUrl}notices/${notice.id}`, requestOptions).then(handleResponse);;
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}notices/delete/${id}`, requestOptions).then(handleResponse);
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