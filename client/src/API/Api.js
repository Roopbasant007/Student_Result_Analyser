import axios from "axios";

const API = axios.create({
  baseURL: "https://student-result-analyser.onrender.com",
});

export default API;
