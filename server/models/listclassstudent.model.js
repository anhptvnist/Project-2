const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./student.model")
const Tern = require("./tern.model")
const Class = require("./class.model")
// const Class = require("./class.model")
const ListClassStudentSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: Student,
        required: true
    },
    tern: {
        type: Schema.Types.ObjectId,
        ref: Tern,
        required: true
    },
    listclass: [{
        type: Schema.Types.ObjectId,
        ref: Class,
        required: true
    }]
});

module.exports = ListClassStudent = mongoose.model('listclassstudent', ListClassStudentSchema);
