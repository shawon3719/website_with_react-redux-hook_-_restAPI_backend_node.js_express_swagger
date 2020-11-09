import axios from "axios";

let token = JSON.parse(localStorage.getItem('token'));

export default axios.create({
  baseURL: "http://192.168.0.41:3004/api",
  headers: {
    "Content-type": "application/json",
    'Authorization': "Bearer "+token
  }
});
