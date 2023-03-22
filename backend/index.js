require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const mongoString = process.env.DATABASE_URL;
const bodyParser = require("body-parser")

const routes = require("./routes/routes")

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json());
app.use("/app",routes)
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server Started at 3001`)
})
    

module.exports = app