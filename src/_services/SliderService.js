import http from "../http-common";

// const getAll = () => {
//   return http.get("sliders/all");
// };

const get = id => {
  return http.get(`sliders/slider/${id}`);
};

// const create =  data => {
//   return fetch(`${apiUrl}sliders/create`, data)
// };

// const update = (data) => {
//   return http.patch(`sliders/update}`, data);
// };

// const remove = id => {
//   return http.delete(`sliders/delete/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`tutorials`);
// };

// const findByTitle = title => {
//   return http.get(`tutorials?title=${title}`);
// };

export default {
  // getAll,
  get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle
};
