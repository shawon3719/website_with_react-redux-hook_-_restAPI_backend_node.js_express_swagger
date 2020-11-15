import http from "../http-common";
const get = id => {
  return http.get(`sliders/slider/${id}`);
};

export default {
  get
};
