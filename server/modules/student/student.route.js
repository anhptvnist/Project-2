const express = require("express");
const router = express.Router();
const StudentController = require('./student.controller');

router.get('/listclassofsession/:subject', StudentController.getClassOfTern );
router.post('/registerclass/:id/:idtern/:idclass', StudentController.registerClass);
router.get('/listclassoftern/:id', StudentController.getlistclassofStudent);
router.get('/searchdata/:id', StudentController.searchData);
router.post('/deleteclass/:id/:idtern/:idclass', StudentController.deleteClass);
router.get('/getlistclassoftern/:id/:idtern', StudentController.getlistclassoftern);
router.get('/getpoint/:id/:idtern', StudentController.getPointOfStudent);
router.get('/getinfo/:id', StudentController.getInfoStudent);


module.exports = router;