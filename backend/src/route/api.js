import express from "express";
import apiControllers, { handleRegister, handleLogin } from '../controllers/apiControllers';
import userController from '../controllers/userController';

let router = express.Router();

let initApiRoutes = (app) => {
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);


    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    return app.use('/api/v1/', router);
}
module.exports = initApiRoutes