import { apiUrl } from "../reusable/apiHost"
import { authHeader } from '../_helpers';
import http from "../http-common";
import { isEmptyObject } from "jquery";

export const calendarService = {
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
    return fetch(`${apiUrl}calendar/all`, requestOptions).then(handleResponse);
}
function create(calendar, calendarImage) {
    console.log(calendar)
    console.log(calendarImage)
        var formdata = new FormData();
        formdata.append("title",calendar.title);
        formdata.append("calendar_file", calendarImage, calendarImage.name);
        formdata.append("priority", calendar.priority);
        formdata.append("created_by", calendar.created_by);
        formdata.append("active_status", calendar.active_status == true? 1 : 0);
        
        const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: formdata,
          redirect: 'follow'
        };     
    return fetch(`${apiUrl}calendar/create`, requestOptions).then(handleResponse);
}

function update(currentCalendar, calendarImage) {
    var formdata = new FormData();
    
    formdata.append("id", currentCalendar.id);
    formdata.append("title",currentCalendar.title);
    if(!isEmptyObject(calendarImage)){
        formdata.append("calendar_file", calendarImage, calendarImage.name);
    }else{
        formdata.append("calendar_file", currentCalendar.calendar_file);
    }
    formdata.append("priority", currentCalendar.priority);
    formdata.append("updated_by", currentCalendar.updated_by);
    formdata.append("active_status", currentCalendar.active_status == true? 1 : 0);
    
    const requestOptions = {
        method: 'PATCH',
        headers: authHeader(),
        body: formdata,
        redirect: 'follow'
      };   
    return fetch(`${apiUrl}calendar/update`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}calendar/calendar/${id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}calendar/delete/${id}`, requestOptions).then(handleResponse);
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