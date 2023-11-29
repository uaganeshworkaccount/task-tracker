const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
var jwtlib=require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

app.use(cors());
app.use(express.json());
const userRoutes=require('./routes/userRoutes')
const taskRoutes=require('./routes/taskRoutes')
app.use(userRoutes);
app.use(taskRoutes);
app.use('/',express.static('./public'))




app.use(express.urlencoded({extended:false}))


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongo DB Connection Successs");
    app.listen(process.env.PORT,()=>{
        console.log(`Node listening to port ${process.env.PORT}`);
    })
}
).catch(()=>{
    console.log("Error occured while connecting to mongoose");
})

module.exports=app;

