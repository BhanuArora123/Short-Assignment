const mongoose = require("mongoose");
const schema = mongoose.Schema;

const subject = new schema({
    name:{
        type:String,
        required:true
    },
    students:[{
        studentId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"student"
        }
    }],
    standardMax:{
        type:Number
    },
    standardMin:{
        type:Number
    }
})
module.exports = mongoose.model("subject",subject);