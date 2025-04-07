require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/LoginRegis/authRoutes');
// add user
const addUser = require('./routes/Adduser/addUser');
const addFileUser = require('./routes/Adduser/addFileUser');
//get
const user = require('./routes/User/showUser');
const course = require('./routes/Coursesetup/Course/showCourse');
const category = require('./routes/Coursesetup/Category/showCat');
const group = require('./routes/Coursesetup/Group/showGroup');
const subject = require('./routes/Coursesetup/Subject/showSub')
const curriculum = require('./routes/Coursesetup/Curriculus/showCur');
const structure = require('./routes/Coursesetup/Structure/getStruc');
//create
const createCourse = require('./routes/Coursesetup/Course/createCourse');
const createCategory = require('./routes/Coursesetup/Category/createCategory');
const createGroup = require('./routes/Coursesetup/Group/createGroup');
const createSub = require('./routes/Coursesetup/Subject/createSub');
const createCurriculum = require('./routes/Coursesetup/Curriculus/createCur');
const postStructure = require('./routes/Coursesetup/Structure/postStruc');
//edit
const editUser = require('./routes/User/editUser');
const editCourse = require('./routes/Coursesetup/Course/editCourse');
const editCat = require('./routes/Coursesetup/Category/editCategory');
const editGroup = require('./routes/Coursesetup/Group/editGroup');
const editSub = require('./routes/Coursesetup/Subject/editSubject');
const editCur = require('./routes/Coursesetup/Curriculus/editCur');
//delete
const deleteUser = require('./routes/User/deleteUser');
const deleteCourse = require('./routes/Coursesetup/Course/deleteCourse');
const deleteCat = require('./routes/Coursesetup/Category/deleteCategory');
const deleteGroup = require('./routes/Coursesetup/Group/deleteGroup');
const deleteSub = require('./routes/Coursesetup/Subject/deleteSubject');
const deleteCur = require('./routes/Coursesetup/Curriculus/deleteCur');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log('✅ MongoDB Connected'))
      .catch(err => console.error('❌ MongoDB Connection Failed:', err));

app.use('/api/auth', authRoutes);
app.use('/api/add', addUser);
app.use('/api/upload', addFileUser);
app.use('/api/create', createCourse, createCategory, createGroup, createSub, createCurriculum, postStructure);
app.use('/api/get', user, course, category, group, subject, curriculum, structure);
app.use('/api/edit', editUser, editCourse, editCat, editGroup, editSub, editCur);
app.use('/api/delete', deleteUser, deleteCourse, deleteCat, deleteGroup, deleteSub, deleteCur);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
