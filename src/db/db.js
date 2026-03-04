const mongoose=require("mongoose")


async function connectDB(){
    await mongoose.connect("mongodb+srv://abhishek:radharamangirdhari@cluster0.93ogvvq.mongodb.net/helly")//uri for the connection to cluser last is the name of database
    console.log("connected to db")
}

module.exports=connectDB;