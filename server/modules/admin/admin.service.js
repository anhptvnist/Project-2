const User = require('../../models/user.model');
const SubjectSet = require('../../models/subjects_set.model');
const Subject = require('../../models/subject.model');
const Tern = require('../../models/tern.model')
const Lecturer = require('../../models/lecturer.model')
const Sessions = require('../../models/sessionresgis.model')
const Classes = require('../../models/class.model')
const ListClassLec = require('../../models/listclasslec.model')
const Student = require('../../models/student.model')
const mongoose = require("mongoose");

// lấy tất cả User 

exports.get = async () => {
    var user = await User.find()
    return user;
}
// Tìm kiếm User
exports.searchUser = async (data) => {
    if (data.role == '3') {
        var user = await User.find();
    } else {
        var tmp = parseInt(data.role)
        // console.log("=======", tmp)
        var user = await User.find({ role: tmp });
    }
    return user;
}
// Tạo bộ môn mới
exports.createSubjectSet = async (data) => {
    const Subjects = await SubjectSet.findOne({ code: data.code });
    if (Subjects == undefined) {
        const SubjectsSet = await SubjectSet.create({
            name: data.name,
            code: data.code,
            parent: data.parent,
        })
    }
    const listSubjects = await SubjectSet.find({});
    return listSubjects;

}
// Lấy tất cả thông tin bộ môn
exports.getSubjects = async () => {
    var listSubjects = await SubjectSet.find({});
    return listSubjects;
}
// Tạo học phần mới
exports.createSubject = async (data) => {
    const Subjects = await Subject.findOne({ code: data.code });
    if (Subjects == undefined) {
        const SubjectsSet = await Subject.create({
            name: data.name,
            code: data.code,
            parent: mongoose.Types.ObjectId(data.parent),
            weightMidtern: data.weightMidtern,
            weightEndtern: data.weightEndtern,
            credits: data.credits,
        })
    }
    const listSubject = await Subject.find({}).populate("parent");
    return listSubject;
}
// Lấy danh sách tất cả học phần
exports.getSubject = async () => {
    var listSubject = await Subject.find({}).populate("parent");
    return listSubject;
}
// Tạo kỳ học mới 
exports.createTern = async (data) => {
    const Terns = await Tern.findOne({ code: data.code });
    if (Terns == undefined) {
        const NewTern = await Tern.create({
            code: data.code,
            startDate: data.startDate,
            endDate: data.endDate,
        })
    }
    const listtern = await Tern.find({});
    return listtern;
}
exports.getTern = async () => {
    var listTern = await Tern.find({});
    return listTern;
}
exports.startTern = async (data) => {
    var OldTerns = await Tern.findById(data.id);
    if (OldTerns !== null) {
        var date = new Date();
        var NewTern = await Tern.findByIdAndUpdate(data.id, { $set: { startDate: date, status: 1 } }, { new: true });
        var listClass = await Classes.updateMany({ tern: data.id }, { $set: { status: 1 } })
    }
    var listTern = await Tern.find({});
    return listTern;
}
exports.endTern = async (data) => {
    var OldTerns = await Tern.findById(data.id);
    if (OldTerns !== null) {
        var date = new Date();
        var NewTern = await Tern.findByIdAndUpdate(data.id, { $set: { endDate: date, status: 2 } }, { new: true });
        var listClass = await Classes.updateMany({ tern: data.id }, { $set: { status: 2 } })
    }
    var listTern = await Tern.find({});
    return listTern;
}
exports.editProfile = async (data) => {
    var user = await User.findById(data.id);
    var date = new Date(data.birth);
    if (user.role == 1) {
        var lecturer = await Lecturer.findOne({ userId: data.id });
        if (lecturer == undefined) {
            var profile = await Lecturer.create({
                userId: mongoose.Types.ObjectId(data.id),
                parent: mongoose.Types.ObjectId(data.parent),
                phone: data.phone,
                birth: date,
                degree: data.degree,
            })
            var profile = await Lecturer.findOne({ userId: data.id }).populate("parent").populate({ path: "userId", select: "name email" });
        } else {
            var newprofile = await Lecturer.findByIdAndUpdate(lecturer._id,
                {
                    $set:
                    {
                        userId: data.id,
                        parent: mongoose.Types.ObjectId(data.parent),
                        phone: data.phone,
                        birth: date,
                        degree: data.degree,
                    }
                }, { new: true });
            var profile = await Lecturer.findOne({ userId: data.id }).populate("parent").populate({ path: "userId", select: "name email" });
        }
    }
    return profile;
}
exports.getProfile = async (data) => {
    var user = await User.findById(data.id);
    if (user.role == 1) {
        var profile = await Lecturer.findOne({ userId: data.id }).populate("parent").populate({ path: "userId", select: "name email" });
    }
    return profile;
}

exports.createSession = async (data) => {
    const NewSession = await Sessions.create({
        startDate: data.startDate,
        endDate: data.endDate,
        tern: data.tern,
    })

    const listsession = await Sessions.find({}).populate("tern");
    return listsession;
}
exports.getSession = async () => {
    var listsession = await Sessions.find({}).populate("tern");
    return listsession;
}

exports.startSession = async (data) => {
    var OldSessions = await Sessions.findById(data.id);
    if (OldSessions !== null) {
        var date = new Date();
        var NewSession = await Sessions.findByIdAndUpdate(data.id, { $set: { startDate: date, status: 1 } }, { new: true });
    }
    var listsession = await Sessions.find({}).populate("tern");
    return listsession;
}
exports.endSession = async (data) => {
    var OldSessions = await Sessions.findById(data.id);
    if (OldSessions !== null) {
        var date = new Date();
        var NewSession = await Sessions.findByIdAndUpdate(data.id, { $set: { endDate: date, status: 2 } }, { new: true });
    }
    var listsession = await Sessions.find({}).populate("tern");
    return listsession;
}

exports.deleteSession = async (data) => {
    var OldSessions = await Sessions.findOneAndDelete({ _id: data.id });
    var listsession = await Sessions.find({}).populate("tern");
    return listsession;
}
exports.test = async () => {
}
exports.createClass = async (data) => {
    // console.log("data----", data)
    const OldClass = await Classes.findOne({ code: data.code });
    if (OldClass == null) {
        const newClass = await Classes.create({
            code: data.code,
            subjectId: data.subjectId,
            status: 0,
            slot: 0,
            tern: data.tern,
            day: data.day,
            slotmax: data.slotmax,
            startDate: data.startDate,
            endDate: data.endDate,
            lecturerId: null,
        })

    }
    const listClass = await Classes.find({}).populate("tern").populate({ path: "lecturerId", populate: { path: 'userId', select: "name email" } })
        .populate({ path: "students.student", populate: { path: 'userId', select: "name email" } });
    return listClass;
}

exports.getClass = async () => {
    const listClass = await Classes.find({}).populate("tern subjectId")
        .populate({ path: "lecturerId", populate: { path: 'userId', select: "name email" } })
        .populate({ path: "students.student", populate: { path: 'userId', select: "name email" } });
    return listClass;
}

exports.deleteClass = async (data) => {
    var OldClass = await Classes.findOneAndDelete({ _id: data.id });
    var listclass = await Classes.find({}).populate("subjectId lecturerId tern");
    return listclass;
}


exports.assignment = async (data) => {
    var check = await ListClassLec.findOne({ lecturerId: data.id, tern: data.idtern });
    if (check == null) {
        var newclass = await ListClassLec.create({
            tern: data.idtern,
            lecturerId: data.id,
            listclass: data.idclass,
        });
        var updateClass = await Classes.findByIdAndUpdate(data.idclass, { lecturerId: data.id }, { new: true });
    } else {
        var newClass = await ListClassLec.findByIdAndUpdate(check, { $push: { listclass: data.idclass } }, { new: true });
        var updateClass = await Classes.findByIdAndUpdate(data.idclass, { lecturerId: data.id }, { new: true });
    }
    const listClass = await Classes.find({}).populate("subjectId tern")
        .populate({ path: "lecturerId", populate: { path: 'userId', select: "name email" } });
    return listClass;
}

exports.getLecturer = async () => {
    var listlecturer = await Lecturer.find().populate("userId");
    return listlecturer;
}
exports.getlistclassofLecturer = async (data) => {
    var listclassoflecturer = await ListClassLec.findOne({ lecturerId: data.id, tern: data.idtern }).populate("listclass");
    var lis = await ListClassLec.find().populate("listclass");
    return listclassoflecturer;
}

exports.setPointOfStudent = async (data) => {
    // console.log(" ====", data)
    // console.log('tyee', typeof (data.midPoint));
    var searchStudent = await Classes.findOne({ _id: data.id });
    var search;
    for (let i in searchStudent.students) {
        if (searchStudent.students[i].student == data.idstudent) {
            search = searchStudent.students[i]._id
        }
    }

    var updateClass = await Classes.updateOne(
        { "students._id": search },
        {
            $set:
            {
                "students.$.midPoint": data.midPoint,
                "students.$.endPoint": data.endPoint,
            }
        },
        { $new: true }
    );

    var listClass = await Classes.findOne({ _id: data.id }); // donog nay de lam gi , "students.$.endPoint": data.endPoint
    //   console.log('eeeee', listClass); 
    return listClass;
}

exports.getStudents = async (data) => {
    if (data.code == "undefined" || data.code == null) {
        var liststudent = await Student.find().populate({ path: "userId", select: "name email" });
    } else {
        var liststudent = await Student.find({ code: data.code }).populate({ path: "userId", select: "name email" });
    }
    return liststudent;
}

exports.editStudents = async (data) => {
    var student = await Student.findOne({ _id: data.id })
    // console.log("===", student);
    var liststudents = await Student.find();
    var check = 0;
    for (let i in liststudents) {
        if (liststudents[i].code == data.code) {
            check = 1;
        }
    }
    if (check == 0) {
        var updatestudent = await Student.findByIdAndUpdate(student._id,
            {
                $set: {
                    code: data.code,
                    grade: data.grade,
                }
            }, { new: true }
        )
    }
    var liststudent = Student.find().populate({ path: "userId", select: "name email" });
    return liststudent;
}

exports.updateStudents = async (data) => {
    var student = await Student.find({})
        .populate({ path: "userId", select: "name email" })
        .populate({ path: "results", populate: { path: 'tern' } })
        .populate({ path: "results.listsubject", populate: { path: 'subject' } })
        .populate({ path: "flunk", populate: { path: 'tern' } })
        .populate({ path: "flunk.listsubject", populate: { path: 'subject' } })
    var pass = 0, fail = 0, warning = 0, tmp, sum = 0, tb = 0;
    for (let i in student) {
        // console.log("===1")
        for (let j in student[i].results) {
            // console.log("===2")
            for (let k in student[i].results[j].listsubject) {
                // console.log("===3")
                pass = pass + student[i].results[j].listsubject[k].subject.credits;
                var check = student[i].results[j].listsubject[k].result;
                if (check == "D")
                    tmp = 1
                else if (check == "D+")
                    tmp = 1.5
                else if (check == "C")
                    tmp = 2
                else if (check == "C+")
                    tmp = 2.5
                else if (check == "B")
                    tmp = 3
                else if (check == "B+")
                    tmp = 3.5
                else if (check == "A" || check == "A+")
                    tmp = 4.0
                sum = sum + tmp * student[i].results[j].listsubject[k].subject.credits;
            }
        }
        for (let j in student[i].flunk) {
            for (let k in student[i].flunk[j].listsubject) {
                fail = fail + student[i].flunk[j].listsubject[k].subject.credits;
                sum = sum;
            }
        }
        if (fail < 8)
            warning = 0;
        else if (fail >= 8 && fail < 16)
            warning = 1;
        else if (fail >= 16 && fail < 27)
            warning = 2;
        else if (fail >= 27)
            warning = 3;
        if ((pass + fail) != 0) {
            tb = sum / (pass + fail);
            // console.log("=====", pass, fail, tb, warning)
            var updateStudents = await Student.findByIdAndUpdate(student[i]._id, {
                $set: {
                    pass: pass,
                    fail: fail,
                    cpa: tb,
                    warning: warning
                }
            }, { new: true })
        }
        pass = 0;
        fail = 0;
        warning = 0;
        tmp = 0;
        sum = 0;
        tb = 0;
    }
    var liststudent = await Student.find({})
        .populate({ path: "results", populate: { path: 'tern' } })
        .populate({ path: "results.listsubject", populate: { path: 'subject' } })
        .populate({ path: "flunk", populate: { path: 'tern' } })
        .populate({ path: "flunk.listsubject", populate: { path: 'subject' } })
        .populate({ path: "userId", select: "name email" })
    return liststudent;
}

