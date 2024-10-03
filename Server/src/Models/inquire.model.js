const mongoose = require('mongoose')

const stdinquireSchema=mongoose.Schema({
    Name:String,
    Age:String,
    // Coures_of_interesrt:String,
    // Email:String,
    // Gender:String,
    // Address:String,
    // Phone:Number,
    // Prefered_timing:String,
    // Education_status:String,
    // Model:String,
    // how_do_you_know:String
},
{
    timestamps: true
})
module.exports=mongoose.model("enqiry",stdinquireSchema)