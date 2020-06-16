const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSet = require('./subjects_set.model');
const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: SubjectSet,
        required: true
    },
    weightMidtern: {
        type: Number,
        required: true
    },
    weightEndtern: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    }
})
module.exports = Subject = mongoose.model('subjects', SubjectSchema);