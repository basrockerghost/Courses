var User = require('../models/User/User')
var csv = require('csvtojson')
const bcrypt = require('bcrypt');

const uploadFile = async(req, res) => {
    try{
        const userData = await csv().fromFile(req.file.path);
        const users = await Promise.all(userData.map(async user => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            return {
                personalID: user.personalID,
                firstname: user.firstname,
                lastname: user.lastname,
                password: hashedPassword, // ใช้ password ที่ถูก hash แล้ว
                role: user.role
            };
        }));
        await User.insertMany(users);

        res.send({  status : 200, success : true, msg:'Imported CSV file' })
    } catch(error) {
        res.send({  status : 400, success : false, msg:error.message })
    }
}

module.exports = {
    uploadFile
}