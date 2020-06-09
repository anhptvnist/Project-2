const express = require("express");
const router = express.Router();
const AdminController = require("./admin.controller");

router.get('/user', AdminController.get);
router.get('/searchuser/:role', AdminController.searchUser);
module.exports = router;