import axios from "../axios";

const handleRegisterService = (data) => {
    return axios.post(`http://localhost:2211/api/v1/register`, data)
}
const loginUser = (valueLogin, password) => {
    return axios.post(`http://localhost:2211/api/v1/login`, { valueLogin, password })
}
const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:2211/api/v1/user/read?page=${page}&limit=${limit}`)
}
export {
    handleRegisterService, loginUser, fetchAllUsers
}