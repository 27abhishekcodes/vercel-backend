const mongoose=require("mongoose")

// also we are going to store the image url in the file

const imageSchema=new mongoose.Schema({
    image:String,
    title:String,
    description: String,
})

const imageModel= mongoose.model("image",imageSchema);

module.exports=imageModel;