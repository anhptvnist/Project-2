const express = require("express");
const router = express.Router();
const LecturerController = require('./lecturer.controller');

router.get('/listclassoflec/:id/:idtern', LecturerController.getlistclassofLecturer);

module.exports = router;