import express from "express";
import apiControllers, { handleRegister, handleLogin, getTest } from '../controllers/apiControllers';
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
let router = express.Router();

const testMiddleware = (req, res, next) => {
    console.log("calling a middleware");
}
// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ['/register', '/login'];
//     if (nonSecurePaths.includes(req.path)) return next();

//     if (user) {

//     }
//     next();
// }
let initApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);

    router.post('/register', handleRegister);
    router.post('/login', handleLogin);


    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    router.get('/group/read', groupController.readFunc);


    return app.use('/api/v1/', router);
}
module.exports = initApiRoutes