const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./user.model");
const Tern = require("./tern.model");
const Subject = require("./subject.model");
const StudentSchema = new Schema({
    code: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    grade: {
        type: Number,
    },
    pass: {
        type: Number,
    },
    fail: {
        type: Number,
    },
    warning: {
        type: Number,
    },
    cpa: {
        type: Number,
    },
    results: [{
        tern: {
            type: Schema.Types.ObjectId,
            ref: Tern,
            required: true,
        },
        listsubject: [{
            subject: {
                type: Schema.Types.ObjectId,
                ref: Subject,
                required: true,
            },
            result: {
                type: String,
            }
        }]
    }],
    flunk: [{
        tern: {
            type: Schema.Types.ObjectId,
            ref: Tern,
            required: true,
        },
        listsubject: [{
            subject: {
                type: Schema.Types.ObjectId,
                ref: Subject,
                required: true,
            },
            result: {
                type: String,
            }
        }]
    }],

})

module.exports = Student = mongoose.model('students', StudentSchema);