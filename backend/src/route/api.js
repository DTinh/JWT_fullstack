import express from "express";
import homeController, { getAllUser } from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/home', getAllUser);

    return app.use('/', router);
}
module.exports = initWebRoutes