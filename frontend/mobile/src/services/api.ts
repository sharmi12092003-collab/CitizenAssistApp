import axios from "axios";

const API = axios.create({
  baseURL: "http://YOUR_IP:5000/api",
});

export default API;
