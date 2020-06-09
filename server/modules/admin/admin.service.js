const User = require('../../models/user.model');

// lấy tất cả User 

exports.get=async()=>{
    var user= await User.find()
    return user;
}

exports.searchUser=async(data)=>{
    if(data.role == '3'){
        var user= await User.find();
    }else{
        var tmp= parseInt(data.role)
        console.log("=======", tmp)
        var user = await User.find({role: tmp});
    }
    return user;
}