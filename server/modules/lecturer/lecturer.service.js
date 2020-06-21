const User = require('../../models/user.model');
const SubjectSet = require('../../models/subjects_set.model');
const Subject = require('../../models/subject.model');
const Tern = require('../../models/tern.model')
const Lecturer = require('../../models/lecturer.model')
const Sessions = require('../../models/sessionresgis.model')
const Classes = require('../../models/class.model')
const Student = require('../../models/student.model')
const ListClassLec = require('../../models/listclasslec.model')
const mongoose = require("mongoose");
// lấy tất cả User 


exports.getlistclassofLecturer = async (data) => {

    var lecturer = await Lecturer.findOne({ userId: data.id })
    // console.log("lecccc", lecturer);
    if (data.idtern == "undefined") {

        var listclassoflecturer = await ListClassLec.find({ lecturerId: mongoose.Types.ObjectId(lecturer._id) })
            .populate({ path: "listclass", populate: { path: 'subjectId tern' } })

    } else {
        var listclassoflecturer = await ListClassLec.find({ lecturerId: lecturer._id, tern: data.idtern })

            .populate({ path: "listclass", populate: { path: 'subjectId tern' } });
    }

    return listclassoflecturer;
}

exports.infoClass = async (data) => {
    var infoClass = await Classes.findOne({ _id: data.id })
        .populate({ path: "students.student", populate: { path: 'userId', select: "name email" } })
        .populate("subjectId tern");
    return infoClass;
}


exports.setPointOfStudent = async (data) => {
    var searchStudent = await Classes.findOne({ _id: data.id });
    console.log(`midPoint-${searchStudent.students[0]._id}`);
    var checkclass = 0;
    var checktern = 0;
    for (let i in searchStudent.students) {
        if (data.results[`midPoint-${searchStudent.students[i]._id}`].value !== undefined &&
            data.results[`endPoint-${searchStudent.students[i]._id}`].value !== undefined
        ) {
            var updateClass = await Classes.updateOne(
                { "students._id": searchStudent.students[i]._id },
                {
                    $set:
                    {
                        "students.$.midPoint": data.results[`midPoint-${searchStudent.students[i]._id}`].value,
                        "students.$.endPoint": data.results[`endPoint-${searchStudent.students[i]._id}`].value,
                    }
                },
                { $new: true }
            );
        };
        if (data.results[`midPoint-${searchStudent.students[i]._id}`].value === undefined &&
            data.results[`endPoint-${searchStudent.students[i]._id}`].value !== undefined) {
            var updateClass = await Classes.updateOne(
                { "students._id": searchStudent.students[i]._id },
                {
                    $set:
                    {
                        // "students.$.midPoint": data.results[`midPoint-${searchStudent.students[i]._id}`].value,
                        "students.$.endPoint": data.results[`endPoint-${searchStudent.students[i]._id}`].value
                    }
                },
                { $new: true }
            )
        };
        if (data.results[`midPoint-${searchStudent.students[i]._id}`].value !== undefined &&
            data.results[`endPoint-${searchStudent.students[i]._id}`].value === undefined) {
            var updateClass = await Classes.updateOne(
                { "students._id": searchStudent.students[i]._id },
                {
                    $set:
                    {
                        "students.$.midPoint": data.results[`midPoint-${searchStudent.students[i]._id}`].value,
                        // "students.$.endPoint": data.results[`endPoint-${searchStudent.students[i]._id}`].value
                    }
                },
                { $new: true }
            )
        }
        if (data.results[`result-${searchStudent.students[i]._id}`].value !== undefined) {
            var updateClass = await Classes.updateOne(
                { "students._id": searchStudent.students[i]._id },
                {
                    $set:
                    {
                        "students.$.result": data.results[`result-${searchStudent.students[i]._id}`].value,
                        // "students.$.endPoint": data.results[`endPoint-${searchStudent.students[i]._id}`].value
                    }
                },
                { $new: true }
            )
            var tmp, check = data.results[`result-${searchStudent.students[i]._id}`].value;
            if (check < 4)
                tmp = "F";
            else if (check >= 4 && check < 5.0)
                tmp = "D";
            else if (check >= 5.0 && check < 5.5)
                tmp = "D+";
            else if (check >= 5.5 && check < 6.5)
                tmp = "C";
            else if (check >= 6.5 && check < 7.0)
                tmp = "C+";
            else if (check >= 7.0 && check < 8.0)
                tmp = "B";
            else if (check >= 8.0 && check < 8.5)
                tmp = "B+";
            else if (check >= 8.5 && check < 9.5)
                tmp = "A";
            else if (check >= 9.5 && check <= 10.0)
                tmp = "A+";
            console.log("tmp", tmp)
            var checkStudent = await Student.findById(searchStudent.students[i].student);
            // console.log("checkstudent", checkStudent);
            if (data.results[`result-${searchStudent.students[i]._id}`].value < 4) {
                console.log("<4")
                // Bỏ phần tử ở mảng qua môn
                if (checkStudent.results.length !== 0) {
                    var createSubject = await Student.updateOne(
                        { _id: searchStudent.students[i].student, "results.tern": searchStudent.tern },
                        {
                            $pull:
                            {
                                "results.$.listsubject":
                                {
                                    subject: searchStudent.subjectId,
                                }
                            }
                        }, { new: true }
                    )
                }
                // Kiểm tra trong tạch môn đã có kì đó hay chưa
                if (checkStudent.flunk.length == 0) { // chưa có kì nào
                    var createTern = await Student.findByIdAndUpdate(
                        searchStudent.students[i].student,
                        {
                            $push:
                            {
                                flunk: {
                                    tern: searchStudent.tern,
                                    listsubject: [{
                                        subject: searchStudent.subjectId,
                                        result: tmp,
                                    }]
                                }
                            }
                        }
                    )
                } else {
                    for (let j in checkStudent.flunk) {
                        if (String(checkStudent.flunk[j].tern) == String(searchStudent.tern)) {
                            checktern = 1;   //đã có kì
                            if (checktern == 1) {
                                for (let k in checkStudent.flunk[j].listsubject) {
                                    if (String(checkStudent.flunk[j].listsubject[k].subject) == String(searchStudent.subjectId)) {
                                        checkclass = 1; // kiểm tra đã có lớp hay chưa
                                        break;
                                    }
                                }
                                if (checkclass == 0) { // chưa có lớp thì thêm vào
                                    var createSubject = await Student.updateOne(
                                        { _id: searchStudent.students[i].student, "flunk.tern": searchStudent.tern },
                                        {
                                            $push:
                                            {
                                                "flunk.$.listsubject":
                                                {
                                                    subject: searchStudent.subjectId,
                                                    result: tmp,
                                                }
                                            }
                                        }, { new: true }
                                    )
                                }
                            }
                            break; // dừng lại khi đã có kì
                        }
                    }
                    if (checktern == 0) { // chưa có kì tạo kì mới
                        var createTern = await Student.findByIdAndUpdate(
                            searchStudent.students[i].student,
                            {
                                $push:
                                {
                                    flunk: {
                                        tern: searchStudent.tern,
                                        listsubject: [{
                                            subject: searchStudent.subjectId,
                                            result: tmp,
                                        }]
                                    }
                                }
                            }
                        )
                    }
                } // kết thúc else
            }
            // Điểm trên >=4 
            if (data.results[`result-${searchStudent.students[i]._id}`].value >= 4) {
                console.log(">=4")
                // Bỏ phần tử ở mảng tạch môn
                if (checkStudent.flunk.length !== 0) {
                    var createSubject = await Student.updateOne(
                        { _id: searchStudent.students[i].student, "flunk.tern": searchStudent.tern },
                        {
                            $pull:
                            {
                                "flunk.$.listsubject":
                                {
                                    subject: searchStudent.subjectId,
                                }
                            }
                        }, { new: true }
                    )
                }
                // Kiểm tra trong qua môn đã có kì đó hay chưa
                console.log("+++++", checkStudent.results.length == 0)
                if (checkStudent.results.length == 0) { // chưa có kì nào
                    var createTern = await Student.findByIdAndUpdate(
                        searchStudent.students[i].student,
                        {
                            $push:
                            {
                                results: {
                                    tern: searchStudent.tern,
                                    listsubject: [{
                                        subject: searchStudent.subjectId,
                                        result: tmp,
                                    }]
                                }
                            }
                        }
                    )
                } else {
                    console.log("Hahaha", checkStudent._id, checkStudent);
                    for (let j in checkStudent.results) {
                        // console.log("===", String(checkStudent.results[j].listsubject[k].subject)== String(searchStudent.tern))
                        if (String(checkStudent.results[j].tern) == String(searchStudent.tern)) {
                            checktern = 1;   //đã có kì
                            if (checktern == 1) {
                                for (let k in checkStudent.results[j].listsubject) {
                                    if (String(checkStudent.results[j].listsubject[k].subject) == String(searchStudent.subjectId)) {
                                        checkclass = 1; // kiểm tra đã có lớp hay chưa
                                        break;
                                    }
                                }
                                if (checkclass == 0) { // chưa có lớp thì thêm vào
                                    var createSubject = await Student.updateOne(
                                        { _id: searchStudent.students[i].student, "results.tern": searchStudent.tern },
                                        {
                                            $push:
                                            {
                                                "results.$.listsubject":
                                                {
                                                    subject: searchStudent.subjectId,
                                                    result: tmp,
                                                }
                                            }
                                        }, { new: true }
                                    )
                                } else {
                                    // console.log("=3=33=3==3=3")
                                    var createSubject = await Student.updateOne(
                                        { _id: searchStudent.students[i].student, "results.tern": searchStudent.tern },
                                        {
                                            $set:
                                            {
                                                "results.$.listsubject":
                                                {
                                                    subject: searchStudent.subjectId,
                                                    result: tmp,
                                                }
                                            }
                                        }, { new: true }
                                    )
                                }
                            }
                            break; // dừng lại khi đã có kì
                        }
                    }
                    if (checktern == 0) { // chưa có kì tạo kì mới
                        var createTern = await Student.findByIdAndUpdate(
                            searchStudent.students[i].student,
                            {
                                $push:
                                {
                                    results: {
                                        tern: searchStudent.tern,
                                        listsubject: [{
                                            subject: searchStudent.subjectId,
                                            result: tmp,
                                        }]
                                    }
                                }
                            }
                        )
                    }
                } // kết thúc else
            }
        }
    }

    // var updateClass = await Classes.updateOne(
    //     { "students._id": search },
    //     {
    //         $set:
    //         {
    //             "students.$.midPoint": data.midPoint,
    //             "students.$.endPoint": data.endPoint,
    //         }
    //     },
    //     {$new: true}
    // );

    var infoClass = await Classes.findOne({ _id: data.id })
        .populate({ path: "students.student", populate: { path: 'userId', select: "name email" } })
        .populate("subjectId tern");
    return infoClass;
}