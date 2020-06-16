const express= require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const auth = require('./modules/auth/auth.route');
const admin =require('./modules/admin/admin.route');
const lecturer = require('./modules/lecturer/lecturer.route');
const student = require('./modules/student/student.route');
const app = express();
app.use(bodyParser.json());
const db = process.env.DATABASE;// DB Config
mongoose // Connect to MongoDB
    .connect(
        db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
global.isLog = false;
app.use(cors());

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/lecturer', lecturer);
app.use('/student', student);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on: ${port} !`));