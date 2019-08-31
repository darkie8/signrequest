const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const uploadMW = require("../middlewares/multerMiddleware")
// const uploadcontroller = require('./../controllers/uploadingfilecontroller')
const appConfig = require("./../../config/appConfig")
// const auth = require('./../middlewares/auth');
// const testing = require('./../controllers/isusdktestController')
// const fb_oauth = require('./../middlewares/facebookOauth');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;
    // app.post(`${baseUrl}/checkdate`,userController.checkDate);
    // app.post(`${baseUrl}/adddate`,userController.addDate);
    app.get(`${baseUrl}/download/:admin/:user/:type`,userController.download); 
    app.post(`${baseUrl}/upload/:admin/:user/:type`,[uploadMW.upload],userController.uploadFiles)
}