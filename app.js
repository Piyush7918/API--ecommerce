const express = require('express');
const app = express();
const port = 7000
const web = require('./routes/web');
const dotenv = require("dotenv");
const connectdb = require('./db/dbcon');



const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

dotenv.config({ path: ".env" });
connectdb();

//routeload
app.use('/api',web)      //localhost:7000/api/



app.listen(port, () => {
    console.log(`listening on port ${port}`)
});