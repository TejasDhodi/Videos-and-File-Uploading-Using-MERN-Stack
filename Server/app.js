const dotenv = require('dotenv');
dotenv.config({ path: './Config/config.env' })

const express = require('express');
const app = express();
const cors = require('cors')
const Database = require('./Database/Upload.Database');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173"
}));

// Routes Import
const uploadRoute = require('./Routes/Upload.Route');

// Route Declaration
app.use("/api/v1", uploadRoute)

Database().then(
    app.listen(process.env.PORT || 5000, () => {
        console.log('Jay Shree Ram');
    })
)
