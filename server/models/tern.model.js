const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate= require ('mongoose-paginate-v2');

const TernSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status:{
        // 0: kỳ học chưa bắt đầu, 1: Kỳ học đang diễn ra, 2: Kỳ học đã kết thúc
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = Tern = mongoose.model('terns', TernSchema);