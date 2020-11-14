import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';

export const sliderService = {
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
    return fetch(`${apiUrl}sliders/all`, requestOptions).then(handleResponse);
}
function create(slider, sliderImage) {
        var formdata = new FormData();
        formdata.append("title", slider.title);
        formdata.append("description",slider.description);
        formdata.append("image", sliderImage, sliderImage.name);
        formdata.append("created_by", slider.created_by);
        formdata.append("priority", slider.priority);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };


        // return fetch(apiUrl+"sliders/create", requestOptions)
        //               .then(response => response.text())
        //               .then((response) => {
        //                 var obj = JSON.parse(response);
        //                   console.log(obj);
        //             })
        //               .catch(error => console.log('error', error));
        //   };
        
    return fetch(`${apiUrl}sliders/create`, requestOptions).then(handleResponse);
}

function update(currentSlider, sliderImage) {
    var formdata = new FormData();
    formdata.append("id", currentSlider.id);
    formdata.append("title", currentSlider.title);
    formdata.append("description", currentSlider.description);
    formdata.append("image", sliderImage, sliderImage.name);
    formdata.append("priority", currentSlider.priority);
    
    const requestOptions = {
      method: 'PATCH',
      headers: authHeader(),
      body: formdata,
      redirect: 'follow'
    };  
return fetch(`${apiUrl}sliders/update`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}sliders/slider/${id}`, requestOptions).then(handleResponse);
}


// function update(slider) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(slider)
//     };

//     return fetch(`${apiUrl}sliders/${slider.id}`, requestOptions).then(handleResponse);;
// }

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