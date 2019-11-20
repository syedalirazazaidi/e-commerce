const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const authRoutes = require('./routes/auth');
app.use(bodyParser.json())
const expressValidator = require('express-validator')
mongoose.connect(process.env.DATABASE)
app.use(cors())
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(morgan('dev'))
app.use(cookieParser())
app.use(expressValidator())
app.use("/api", authRoutes)

// app.use('/', (req, res) => {
//     console.log("node on running on port")
//     res.send("hello from nodejs server")
// });
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server in running on port ${port}`)
})