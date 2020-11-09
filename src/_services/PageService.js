import http from "../http-common";
import { apiUrl} from "../reusable/apiHost"

const getAll = () => {
  return http.get("/pages/all");
};

const get = id => {
  return http.get(`/pages/page/${id}`);
};

const create =  data => {
  return fetch(`${apiUrl}sliders/create`, data)
};

const update = (data) => {
  return http.patch(`/sliders/update}`, data);
};

const remove = id => {
  return http.delete(`/sliders/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
