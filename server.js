require('dotenv').config();

const app=require("./src/app")
const connectDB=require("./src/db/db")
const PORT = process.env.PORT || 3000;
console.log("JWTsceret" , process.env.JWT_SECRET);
connectDB();



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
