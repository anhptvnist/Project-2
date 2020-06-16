const express = require("express");
const router = express.Router();
const StudentController = require('./student.controller');

router.get('/listclassofsession/:subject', StudentController.getClassOfTern );
router.post('/registerclass/:id/:idtern/:idclass', StudentController.registerClass);
router.get('/listclassoftern/:id', StudentController.getlistclassofStudent);
router.get('/searchdata/:id', StudentController.searchData)

module.exports = router;