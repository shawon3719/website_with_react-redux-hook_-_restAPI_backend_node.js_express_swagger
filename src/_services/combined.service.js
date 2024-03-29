import http from "../http-common";
const getSlider = id => {
  return http.get(`sliders/slider/${id}`);
};
const getNotice = id => {
  return http.get(`notices/notice/${id}`);
};
const getCalendar = id => {
  return http.get(`calendar/calendar/${id}`);
};
const getEmployeeCategory = id => {
  return http.get(`employee-category/employeeCategory/${id}`);
};
const getEmployee = id => {
  return http.get(`employee/employee/${id}`);
};
const getGallery = id => {
  return http.get(`galleries/gallery/${id}`);
};
const getSystem = id => {
  return http.get(`system-settings/system/${id}`);
};
export default {
  getSlider,
  getNotice,
  getCalendar,
  getEmployeeCategory,
  getEmployee,
  getGallery,
  getSystem
};
