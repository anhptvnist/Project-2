const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");
const SubjectSet = require("./subjects_set.model")
const Tern = require("./tern.model")
// const Class = require("./class.model")
const LerturerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: SubjectSet,
     
    },
    phone: {
        type: String,
        
    },
    birth:{
        type: Date,
        
    },
    degree:{
        type: String,
        
    },
    // datatern:[{
    //     tern: {
    //         type: Schema.Types.ObjectId,
    //         ref: Tern,
    //         required: true
    //     },
    //     listclass:[{
    //         type: Schema.Types.ObjectId,
    //         ref: Class,
    //         required: true
    //     }]
    // }]
});

module.exports = Lerturer = mongoose.model('lecturters', LerturerSchema);
