import { Axios } from "axios";

const api = new Axios({
  baseURL: "http://localhost:8000/api",
});

export default api;
