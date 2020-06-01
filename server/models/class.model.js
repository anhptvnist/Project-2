const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lecturter = require("./lecturer.model");
const Subject = require("./subject.model");
const Student = require("./student.model");
const ClassSchema = new Schema({
    subjectId:{
        type: Schema.Types.ObjectId,
        ref: Subject,
        required: true
    },
    lecturterId:{
        type: Schema.Types.ObjectId,
        ref: Lecturter,
        required: true
    },
    students:[{
        type: Schema.Types.ObjectId,
        ref: Student,
        required: true,
    }],
    status:{
        // 0: Đang mở đăng ký, 1: Đang hoạt động, 2: Đã kết thúc
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type : Date,
        default: Date.now
    }   
});

module.exports = Class = mongoose.model('class', ClassSchema)