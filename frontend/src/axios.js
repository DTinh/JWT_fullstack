import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});
// instance.defaults.withCredentials = true;

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")} `;

instance.interceptors.response.use(
    (response) => {

        // Thrown error for request with OK status code
        // const { data } = response;
        return response.data;
    }, (err) => {
        const status = err && err.response && err.response.status || 500;

        switch (status) {
            // authentication (token related issues)
            case 401: {
                toast.error('Unauthorized the user. please login...');
                return err.response.data;
            }

            // forbidden (permission related issues)
            case 403: {
                toast.error(`You don't have the permission to access this resource...`);
                return Promise.reject(err);
            }

            // bad request
            case 400: {
                return Promise.reject(err);
            }

            // not found
            case 404: {
                return Promise.reject(err);
            }

            // conflict
            case 409: {
                return Promise.reject(err);
            }

            // unprocessable
            case 422: {
                return Promise.reject(err);
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject(err);
            }
        }
    }
);

export default instance;
