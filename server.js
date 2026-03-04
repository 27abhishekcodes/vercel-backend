require('dotenv').config();

const app=require("./src/app")
const connectDB=require("./src/db/db")
console.log("JWTsceret" , process.env.JWT_SECRET);
connectDB();



app.listen(3000,()=>{
    console.log("server is listening to port 3000")
}) 