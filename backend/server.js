const express = require('express');
const  bodyParser= require('body-parser');
const connectDB = require('./config/dbconnect');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

//connecting db
connectDB();

//routes
app.use("/user",require('./routes/user'));
app.use("/auth",require('./routes/auth'));
app.use("/profileApplicant",require('./routes/profileApplicant'));
app.use("/profileRecruiter", require('./routes/profileRecruiter'));
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));