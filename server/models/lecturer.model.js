const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");
const LerturterSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    
});

module.exports = Lerturter = mongoose.model('lecturters', LerturterSchema);
