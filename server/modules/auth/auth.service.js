const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidation} = require('./validation');
const User = require('../../models/user.model');

exports.login = async(data)=>{
    console.log("----", data);
    const {error} = loginValidation(data);
    if(error) throw (error.details[0].message);

    const user = await User.findOne({email: data.email});
    console.log("----", user);
    if(!user) throw ["email_invalid"];
    const validPass = await bcrypt.compare(data.password, user.password);
    console.log("======", validPass);

    if(!validPass)  throw ['password_invalid'];
    const token = await jwt.sign(
        {
            _id: user._id, 
        }, 
        process.env.TOKEN_SECRET
    );
    user.tokens.push(token);
    user.save();
    
    console.log("++++++", user);
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


exports.logout = async (id, token) => {
    console.log("=====", id, token);
    var user = await User.findById(id);
    var position = await user.tokens.indexOf(token);
    user.tokens.splice(position, 1);
    user.save();
    return user;
}

exports.register = async (data) =>{
    console.log("---", data);
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

    return user
}