const express = require("express");
const router = express.Router();
const LecturerController = require('./lecturer.controller');

router.get('/listclassoflec/:id/:idtern', LecturerController.getlistclassofLecturer);
router.get('/infoclass/:id', LecturerController.infoClass);
router.post('/setpoint', LecturerController.setPointOfStudent);

module.exports = router;