import axios from "axios"; // it is a js library used to make HTTP requests(GET,PUT,PATCH,POST,DELETE) from the browser or nodejs using promises

const api = axios.create({
  baseURL: "http://localhost:2000/api",
  withCredentials: true,
});

export default api;


