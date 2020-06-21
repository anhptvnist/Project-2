const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidation} = require('./validation');
const User = require('../../models/user.model');
const Lecturer = require('../../models/lecturer.model');
const Student = require('../../models/student.model')

exports.login = async(data)=>{
    const {error} = loginValidation(data);
    if(error) throw (error.details[0].message);
    const user = await User.findOne({email: data.email});
    if(!user) throw ["email_invalid"];
    const validPass = await bcrypt.compare(data.password, user.password);


    if(!validPass)  throw ['password_invalid'];
    const token = await jwt.sign(
        {
            _id: user._id, 
        }, 
        process.env.TOKEN_SECRET
    );
    user.tokens.push(token);
    user.save();
    
    return { 
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
};


exports.logout = async (data) => {
    var user = await User.findById(data.id);
    var position = await user.tokens.indexOf(data.token);
    console.log("position", position);
    user.tokens.splice(position, 1);
    user.save();
    return user;
}

exports.register = async (data) =>{
    const emailExist = await User.findOne({email : data.email});
    if(emailExist) throw ["email_was_used"];
    const userNameExist = await User.findOne({name : data.name});
    if(userNameExist) throw ["userName_was_used"];
    const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await User.create({
        name : data.name,
        password : hashedPassword,
        email : data.email,   
        role: data.role,
    })
    if(user.role == 1){
         var lecturer = Lecturer.create({
             userId: user._id,
         })
    }
    if(user.role == 2){
        var student = Student.create({
            userId: user._id,
            pass: 0,
            warning: 0,
            fail: 0,
        })
   }
    const listuser = await User.find({});
    return listuser;
}

exports.getUserByID =async(data)=>{
    var Userofme = await User.findById(data.id).select('name email');
    return Userofme;
}
