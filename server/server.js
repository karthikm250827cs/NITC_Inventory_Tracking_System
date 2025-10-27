const dotenv = require("dotenv").config();
//require("dotenv").config({ path: __dirname + "/server/.env" });
const express = require("express");
const connectDB=require("./config/connectDB");

const app = express();

//routes

app.get("/",(req,res) => {
    res.send("Home page");
});

connectDB();

const PORT = process.env.PORT || 5000;



const startServer = async() => {
    try{
        await connectDB();
        app.listen(PORT,() => {
        console.log(`Server Running on port ${PORT}`);
        });
    }catch(error){
        console.log(error);


    }
};

startServer();

//mongodb+srv://nitcinventory:<db_password>@merninventory.yrmw3wh.mongodb.net/?appName=merninventory