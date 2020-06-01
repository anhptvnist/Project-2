const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./user.model");

const StudentSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },

})

module.exports = Student = mongoose.model('students', StudentSchema);