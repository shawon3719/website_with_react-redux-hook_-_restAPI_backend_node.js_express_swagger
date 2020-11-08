import axios from "axios";

let token = JSON.parse(localStorage.getItem('token'));

export default axios.create({
  baseURL: "http://localhost:3004/api",
  headers: {
    "Content-type": "application/json",
    'Authorization': "Bearer "+token
  }
});
