const express= require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const auth = require('./modules/auth/auth.route');
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


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on: ${port} !`));