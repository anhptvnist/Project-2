const User = require('../../models/user.model');
const SubjectSet = require('../../models/subjects_set.model');
const Subject = require('../../models/subject.model');
const Tern = require('../../models/tern.model')
const Lecturer = require('../../models/lecturer.model')
const Sessions = require('../../models/sessionresgis.model')
const Classes = require('../../models/class.model')
const ListClassLec = require('../../models/listclasslec.model')
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
        console.log("=======", tmp)
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
    }
    var listTern = await Tern.find({});
    return listTern;
}
exports.endTern = async (data) => {
    var OldTerns = await Tern.findById(data.id);
    if (OldTerns !== null) {
        var date = new Date();
        var NewTern = await Tern.findByIdAndUpdate(data.id, { $set: { endDate: date, status: 2 } }, { new: true });
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
    var OldSessions = await Sessions.findOneAndDelete({_id: data.id});
    var listsession = await Sessions.find({}).populate("tern");
    return listsession;
}
exports.test =async()=>{
}
exports.createClass = async(data)=>{
    // console.log("data----", data)
    const OldClass = await Classes.findOne({ code: data.code });
    if(OldClass == null){
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
    const listClass = await Classes.find({}).populate("subjectId tern")
                                            .populate({ path: "lecturerId", populate: { path: 'userId', select: "name email" } });
    return listClass;
}

exports.getClass = async () => {
    const listClass = await Classes.find({}).populate("subjectId tern").populate({ path: "lecturerId", populate: { path: 'userId', select: "name email" } });
    return listClass;
}

exports.deleteClass = async (data) => {
    var OldClass = await Classes.findOneAndDelete({_id: data.id});
    var listclass= await Classes.find({}).populate("subjectId lecturerId tern");
    return listclass;
}


exports.assignment = async(data)=>{
    var check = await ListClassLec.findOne({lecturerId: data.id, tern: data.idtern});
    if(check == null){
        var newclass= await ListClassLec.create({
            tern: data.idtern,
            lecturerId: data.id,
            listclass: data.idclass,
        });
        var updateClass = await Classes.findByIdAndUpdate(data.idclass, {lecturerId: data.id}, {new: true});
    }else{
        var newClass = await ListClassLec.findByIdAndUpdate(check, {$push: {listclass: data.idclass}}, {new: true});
        var updateClass = await Classes.findByIdAndUpdate(data.idclass, {lecturerId: data.id}, {new: true});
    }
    const listClass = await Classes.find({}).populate("subjectId tern")
    .populate({ path: "lecturerId", populate: { path: 'userId', select: "name email" } });
    return listClass;
}

exports.getLecturer = async()=>{
    var listlecturer= await Lecturer.find().populate("userId");
    return listlecturer;
}
exports.getlistclassofLecturer = async(data)=>{
    var listclassoflecturer = await ListClassLec.findOne({lecturerId: data.id, tern: data.idtern}).populate("listclass");
    var lis= await ListClassLec.find().populate("listclass");
    return listclassoflecturer;
}