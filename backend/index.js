require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const addStudent = require('./routes/addStudent');
const addFileStd = require('./routes/addFileStd');

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
app.use('/api/add', addStudent);
app.use('/api/upload', addFileStd);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
