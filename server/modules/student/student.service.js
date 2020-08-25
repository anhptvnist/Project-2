const User = require('../../models/user.model');
const SubjectSet = require('../../models/subjects_set.model');
const Subject = require('../../models/subject.model');
const Tern = require('../../models/tern.model')
const Lecturer = require('../../models/lecturer.model')
const Sessions = require('../../models/sessionresgis.model')
const Classes = require('../../models/class.model')
const ListClassLec = require('../../models/listclasslec.model')
const Student = require('../../models/student.model')
const ListClassStudent = require('../../models/listclassstudent.model')
const mongoose = require("mongoose");
// lấy tất cả User 


exports.getClassOfTern = async (data) => {
    var listclasses = [];
    var listsessions = await Sessions.find({ status: 1 });
    for (let i in listsessions) {
        if (data.subject == 'undefined') {
            var listclass = await Classes.find({ tern: listsessions[i].tern, status: 0 })
                .populate("subjectId tern");
            for (let j in listclass) {
                listclasses.push(listclass[j]);
            }
        } else {
            var subject = await Subject.findOne({ code: data.subject });
            var listclass = await Classes.find({ subjectId: subject._id, tern: listsessions[i].tern, status: 0 })
                .populate("subjectId tern");
            for (let j in listclass) {
                listclasses.push(listclass[j]);
            }
        }
    }
    return listclasses;
}

exports.registerClass = async (data) => {
    var student = await Student.findOne({ userId: data.id })
    //  console.log("========", student);
    var classtest = await Classes.findOne({ code: data.idclass })
    var check = await ListClassStudent.findOne({ studentId: student._id, tern: data.idtern });
    if (check == null) {
        // console.log("Hiiiii")
        var newclass = await ListClassStudent.create({
            tern: data.idtern,
            studentId: student._id,
            listclass: classtest._id,
        });
        var oldClass = await Classes.findById(classtest._id);
        var slot = oldClass.slot + 1;
        var updateClass = await Classes.findByIdAndUpdate(classtest._id, { $push: { students: { student: student._id, midPoint: null, endPoint: null, result: null } }, slot: slot }, { new: true });
    } else {
        // console.log("H22")
        var newClass = await ListClassStudent.findByIdAndUpdate(check, { $push: { listclass: classtest._id } }, { new: true });
        var oldClass = await Classes.findById(classtest._id);
        var slot = oldClass.slot + 1;
        var updateClass = await Classes.findByIdAndUpdate(classtest._id, { $push: { students: { student: student._id, midPoint: null, endPoint: null, result: null } }, slot: slot }, { new: true });
    }
    var listclassofstudent = await ListClassStudent.find({ studentId: student._id, tern: data.idtern })
        .populate({ path: "listclass", populate: { path: 'subjectId tern' } });

    return listclassofstudent;
}

exports.getlistclassofStudent = async (data) => {
    var student = await Student.findOne({ userId: data.id })

    var listsessions = await Sessions.find({ status: 1 });

    var listclassofstudent = await ListClassStudent.find({ studentId: student._id, tern: listsessions[0].tern })
        .populate({ path: "listclass", populate: { path: 'subjectId tern' } });

    return listclassofstudent;
}

exports.searchData = async (data) => {
    var subject = await Subject.findOne({ code: data.id });
    var listsessions = await Sessions.find({ status: 1 });

    var listClass = await Classes.find({ subjectId: subject._id, status: 0 })
        .populate("subjectId tern");

    return listClass;
}

exports.deleteClass = async (data) => {
    // console.log("===", data);
    var student = await Student.findOne({ userId: mongoose.Types.ObjectId(data.id) })
    // console.log("========", student);
    var check = await ListClassStudent.findOne({ studentId: student._id, tern: data.idtern });
    // console.log("++++", check);

    // console.log("H22")
    var newClass = await ListClassStudent.findByIdAndUpdate(check, { $pull: { listclass: data.idclass } }, { new: true });
    var oldClass = await Classes.findById(data.idclass);
    var slot = oldClass.slot - 1;
    var updateClass = await Classes.findByIdAndUpdate(data.idclass, { $pull: { students: { student: student._id } }, slot: slot }, { new: true });

    var listclassofstudent = await ListClassStudent.find({ studentId: student._id, tern: data.idtern })
        .populate({ path: "listclass", populate: { path: 'subjectId tern' } });

    return listclassofstudent;
}
exports.getlistclassoftern = async (data) => {
    var student = await Student.findOne({ userId: data.id })
    if (data.idtern == "undefined") {
        var ListClassOfTern = await ListClassStudent.find({ studentId: student._id })
            .populate({ path: "listclass", populate: { path: 'subjectId tern' } });

    } else {
        var ListClassOfTern = await ListClassStudent.find({ studentId: student._id, tern: mongoose.Types.ObjectId(data.idtern) })
            .populate({ path: "listclass", populate: { path: 'subjectId tern' } });
    }


    return ListClassOfTern;
}

exports.getPointOfStudent = async (data) => {
    var student = await Student.findOne({ userId: data.id })
        .populate({ path: "results", populate: { path: 'tern' } })
        .populate({ path: "results.listsubject", populate: { path: 'subject' } })
        .populate({ path: "flunk", populate: { path: 'tern' } })
        .populate({ path: "flunk.listsubject", populate: { path: 'subject' } })
    // console.log("student", student);
    var listpoint = [];
    if (data.idtern == "undefined") {
        for (let i in student.results) {
            for (let j in student.results[i].listsubject) {
                var subject = {
                    subject: student.results[i].listsubject[j].subject,
                    result: student.results[i].listsubject[j].result,
                    tern: student.results[i].tern,
                }
                listpoint.push(subject)
            }
        }
        for (let i in student.flunk){
            for (let j in student.flunk[i].listsubject) {
                var subject = {
                    subject: student.flunk[i].listsubject[j].subject,
                    result: student.flunk[i].listsubject[j].result,
                    tern: student.flunk[i].tern,
                }
                listpoint.push(subject)
            }
        }
    } else {
        for (let i in student.results) {
            if (String(student.results[i].tern) == String(data.idtern)){
                for (let j in student.results[i].listsubject) {
                    var subject = {
                        subject: student.results[i].listsubject[j].subject,
                        result: student.results[i].listsubject[j].result,
                        tern: student.results[i].tern,
                    }
                    listpoint.push(subject)
                }
            }
        }
        for (let i in student.flunk){
            if (String(student.flunk[i].tern) == String(data.idtern)){
                for (let j in student.flunk[i].listsubject) {
                    var subject = {
                        subject: student.flunk[i].listsubject[j].subject,
                        result: student.flunk[i].listsubject[j].result,
                        tern: student.flunk[i].tern,
                    }
                    listpoint.push(subject)
                }
            }
        }
    }

    return listpoint;
}

exports.getInfoStudent = async(data) => {
    var student = await Student.findOne({userId: data.id})
        .populate({ path: "userId", select: "name email" })
    return student;
}

exports.test = async(data) => {
   console.log("data", data)
}