import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";
import { isEmptyObject } from "jquery";

export const galleryService = {
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
    return fetch(`${apiUrl}galleries/all`, requestOptions).then(handleResponse);
}
function create(gallery, galleryImage) {

    console.log('myGallery')
    console.log(gallery)
    console.log(galleryImage)

        var formdata = new FormData();
        formdata.append("title", gallery.title);
        formdata.append("image", galleryImage, galleryImage.name);
        formdata.append("created_by", gallery.created_by);
        formdata.append("active_status", gallery.active_status == true? 1 : 0);
        formdata.append("priority", gallery.priority);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };
        
    return fetch(`${apiUrl}galleries/create`, requestOptions).then(handleResponse);
}

function update(currentGallery, galleryImage) {
    var formdata = new FormData();
    formdata.append("id", currentGallery.id);
    formdata.append("title", currentGallery.title);
    if(!isEmptyObject(galleryImage)){
        formdata.append("image", galleryImage, galleryImage.name);
    }else{
        formdata.append("image", currentGallery.image);
    }
    formdata.append("updated_by", currentGallery.created_by);
    formdata.append("active_status", currentGallery.active_status == true? 1 : 0);
    formdata.append("priority", currentGallery.priority);
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}galleries/update`, requestOptions).then(handleResponse);
}

const getById = id => {
    return http.get(`galleries/gallery/${id}`);
  };

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}galleries/delete/${id}`, requestOptions).then(handleResponse);
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