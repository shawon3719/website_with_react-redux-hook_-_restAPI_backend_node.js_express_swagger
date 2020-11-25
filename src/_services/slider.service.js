import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import { isEmptyObject } from "jquery";

export const sliderService = {
    create,
    getAll,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}sliders/all`, requestOptions).then(handleResponse);
}
function create(slider, sliderImage) {
        var formdata = new FormData();
        formdata.append("title", slider.title);
        formdata.append("description",slider.description);
        formdata.append("image", sliderImage, sliderImage.name);
        formdata.append("created_by", slider.created_by);
        formdata.append("priority", slider.priority);
        formdata.append("active_status", slider.active_status == true? 1 : 0);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };
        
    return fetch(`${apiUrl}sliders/create`, requestOptions).then(handleResponse);
}

function update(currentSlider, sliderImage) {
    var formdata = new FormData();
    formdata.append("id", currentSlider.id);
    formdata.append("title", currentSlider.title);
    formdata.append("description", currentSlider.description);
    if(!isEmptyObject(sliderImage)){
        formdata.append("image", sliderImage, sliderImage.name);
    }else{
        formdata.append("image", currentSlider.image);
    }
    formdata.append("priority", currentSlider.priority);
    formdata.append("active_status", currentSlider.active_status == true ? 1 : 0);
    formdata.append("updated_by", currentSlider.updated_by);
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}sliders/update`, requestOptions).then(handleResponse);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}sliders/delete/${id}`, requestOptions).then(handleResponse);
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