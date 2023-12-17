const User = require("../Modals/userModel")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

const createUser = asyncHandler(async (req, res) => {

    try{
    const { email, password } = req.body.data
    const user = await User.findOne({ email })
    if (user) {
      return  res.status(404).json({message :"User Already Exists"})
    }
    else{

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: encryptedPassword })
    if (newUser) {
      return  res.status(201).json({success: true})
    }
    else {
       return res.status(400).json({message : "User Cannot be Created"}) 
    }
    }
}
catch(err){
   return  res.send(err)
}
}
)



// Handles login function
const login = asyncHandler(async (req, res) => {
    try{
    const { email, password } = req.body;

    const searchUser = await User.findOne({ email })
    if (!searchUser) {
        res.status(400).json({message:"No User Found "})
    }

    const check = await bcrypt.compare(password, searchUser.password)

    if (check && searchUser) {
      return  res.json({
            _id: searchUser._id,
            email: searchUser.email,
            pic: searchUser.pic,
        })
    }
    else {
        res.status(400).json({message:"Invalid Credentials"})
    }

}
catch(err){
    console.log(err)
}
})

module.exports = { createUser, login }