import axios from "axios"
import * as Config from "./constant"
export default function axiosConfig(endpoint, method, data) {
    return axios({
        method: method,
        url: `${Config.URL}/${endpoint}`,
        data: data,
    }).catch(error => {
        console.log(error)
    }) 
}
