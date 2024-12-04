import axios from "../axios";

const handleRegisterService = (data) => {
    return axios.post(`http://localhost:2211/api/v1/register`, data)
}
const loginUser = (valueLogin, password) => {
    return axios.post(`http://localhost:2211/api/v1/login`, { valueLogin, password })
}
export {
    handleRegisterService, loginUser
}