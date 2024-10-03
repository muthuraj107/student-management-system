const mongoose = require("mongoose");
const stdenqirySchema=mongoose.Schema({
    Name:String,
    Age:String,
    Coures_of_interesrt:String,
    Email:String,
    Gender:String,
    Address:String,
    Phone:Number,
    Prefered_timing:String,
    Education_status:String,
    Mode:String,
    how_do_you_know:String
})
module.exports=mongoose.model("enqiry1",stdenqirySchema)