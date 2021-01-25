import { create } from "apisauce";
import { URL } from "../../app/config";

const api = create({
  baseURL: `${URL}/`,
  headers: { Accept: "application/json" }
});

export default api;
