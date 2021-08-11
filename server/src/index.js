const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const DataDb = require('./db/DataDb.js')
const Router = require('./routes/router.js')
const cors = require('cors')
require('./db/connection.js')

//middleware
app.use(express.json());
app.use(cors());
app.use("/",Router);

//sending data to db
DataDb();
//listen on http://localhost
app.listen(PORT,()=> {console.log(`listening on ${PORT}`)});
