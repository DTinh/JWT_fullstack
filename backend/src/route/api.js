import express from "express";
import apiControllers, { handleRegister, handleLogin } from '../controllers/apiControllers';
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';

let router = express.Router();

const testMiddleware = (req, res, next) => {
    console.log("calling a middleware");

}
let initApiRoutes = (app) => {

    router.post('/register', handleRegister);
    router.post('/login', testMiddleware, handleLogin);


    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    router.get('/group/read', groupController.readFunc);


    return app.use('/api/v1/', router);
}
module.exports = initApiRoutes