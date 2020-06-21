const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lecturter = require("./lecturer.model");
const Subject = require("./subject.model");
const Student = require("./student.model");
const Tern = require("./tern.model");
const ClassSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: Subject,
        required: true
    },
    lecturerId: {
        type: Schema.Types.ObjectId,
        ref: Lecturter,
    },
    students: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: Student,
            required: true,
        },
        midPoint: {
            type: Number
        },
        endPoint: {
            type: Number
        },
        result: {
            type: Number
        }
    }],
    status: {
        // 0: Đang mở đăng ký, 1: Đang hoạt động, 2: Đã kết thúc, 3: Hủy lớp
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    tern: {
        type: Schema.Types.ObjectId,
        ref: Tern,
        required: true
    },
    slot: {
        type: Number,
        required: true,
    },
    slotmax: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
});

module.exports = Classes = mongoose.model('classes', ClassSchema)