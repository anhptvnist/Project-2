const User = require('../../models/user.model');
const SubjectSet = require('../../models/subjects_set.model');
const Subject = require('../../models/subject.model');
const Tern = require('../../models/tern.model')
const Lecturer = require('../../models/lecturer.model')
const Sessions = require('../../models/sessionresgis.model')
const Classes = require('../../models/class.model')
const ListClassLec = require('../../models/listclasslec.model')
const mongoose = require("mongoose");
// lấy tất cả User 


exports.getlistclassofLecturer = async(data)=>{

    var lecturer = await Lecturer.findOne({userId: data.id})
    console.log("lecccc", lecturer);
    if(data.idtern == "undefined" ){

        var listclassoflecturer = await ListClassLec.find({lecturerId: mongoose.Types.ObjectId(lecturer._id)})
                                .populate({ path: "listclass", populate: { path: 'subjectId tern' } })
                                
    }else{
        var listclassoflecturer = await ListClassLec.find({lecturerId: lecturer._id, tern: data.idtern})
                                    
                                    .populate({ path: "listclass", populate: { path: 'subjectId tern' } });
    }
    
    return listclassoflecturer;
}