const mongoose=require('mongoose');

const bookmarkSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
}, {Timestamps:true});

module.exports=mongoose.model('bookmark',bookmarkSchema);