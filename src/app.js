const express=require('express')
const cors = require("cors");

const app=express();
app.use(cors({
  origin: ["http://localhost:5173","https://vercel-frontend-eta-six.vercel.app" ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartroutes=require("./routes/cartroutes")
const orderRoutes=require("./routes/orderRoutes")

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartroutes);
app.use("/api/orders", orderRoutes);



module.exports=app;
