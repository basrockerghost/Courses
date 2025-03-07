var User = require('../models/User')
var csv = require('csvtojson')


const uploadFile = async(req, res) => {
    try{
        
        const userData = await csv().fromFile(req.file.path);
        const users = userData.map(user => ({
            personalID: user.personalID,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password
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