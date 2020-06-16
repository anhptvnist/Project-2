const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lecturer = require("./lecturer.model")
const Tern = require("./tern.model")
const Class = require("./class.model")
// const Class = require("./class.model")
const ListClassLecSchema = new Schema({
    lecturerId: {
        type: Schema.Types.ObjectId,
        ref: Lecturer,
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

module.exports = ListClassLec = mongoose.model('listclasslec', ListClassLecSchema);
