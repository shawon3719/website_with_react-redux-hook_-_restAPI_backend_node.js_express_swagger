import http from "../http-common";
const getSlider = id => {
  return http.get(`sliders/slider/${id}`);
};
const getNotice = id => {
  return http.get(`notices/notice/${id}`);
};
export default {
  getSlider,
  getNotice
};
