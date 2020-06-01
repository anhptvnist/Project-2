const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate= require ('mongoose-paginate-v2');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        // 0: Admin, 1: Lecturer, 2: Student
        type: Number,
        required: true
    },
    tokens: [{
        type: String,
    }],
});

module.exports = User = mongoose.model('users', UserSchema);