import express from "express";
import apiControllers, { handleRegister, handleLogin } from '../controllers/apiControllers';

let router = express.Router();

let initApiRoutes = (app) => {
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);

    return app.use('/api/v1/', router);
}
module.exports = initApiRoutes