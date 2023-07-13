const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    status:{type:Boolean,required:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"userdetail"},
    likes:{type:[String],default:[]}
})

module.exports = mongoose.model("Post",postSchema);