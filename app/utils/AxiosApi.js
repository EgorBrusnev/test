import axios from "axios";
import _ from "lodash";
import { baseUrl } from "../Constants"


api = axios.create({
    baseURL: "http://brusneve-l:8080",
    timeout: 15000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

api.interceptors.response.use(
    response => {
        if (_.isUndefined(response.data.error)) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    }, error => {
        return Promise.reject(response.data);
    }
)

export default api;