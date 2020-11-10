import axios from "axios";
import { apiUrl } from "./reusable/apiHost"
import { from } from "core-js/fn/array";

let token = JSON.parse(localStorage.getItem('token'));

export default axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-type": "application/json",
    'Authorization': "Bearer "+token
  }
});
