const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const Tern = require('./tern.model')
const mongoosePaginate= require ('mongoose-paginate-v2');

const SessionSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status:{
        // 0: chưa bắt đầu 1: Đang mở, 2: Đã kết thúc
        type: Number,
        required: true,
        default: 0,
    },
    tern: {
        type: Schema.Types.ObjectId,
        ref: Tern,
        required: true
    },
});

module.exports = Session = mongoose.model('sessions', SessionSchema);