import axios from "axios"
import * as Config from "./constant"
export default function axiosConfig(endpoint, method, data) {
    const headers = {
        authorization: $cookies.get("access-token")
    };
    return axios({
        method: method,
        url: `${Config.URL}/${endpoint}`,
        data: data,
        withCredentials: true,
        headers
    })

}
