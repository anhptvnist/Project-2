const express = require("express");
const router = express.Router();
const AuthController = require('./auth.controller');


router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.register);
router.get('/getuserbyid/:id', AuthController.getUserByID);

module.exports = router;