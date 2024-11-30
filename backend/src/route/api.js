import express from "express";
import apiControllers, { handleRegister } from '../controllers/apiControllers';

let router = express.Router();

let initApiRoutes = (app) => {
    router.post('/register', handleRegister);

    return app.use('/api/v1/', router);
}
module.exports = initApiRoutes