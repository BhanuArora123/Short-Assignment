const mongoose = require("mongoose");
const schema = mongoose.Schema;

const societySchema = new schema({
    name:{
        type:String,
        required:true
    },
    standardMax:{
        type:Number
    },
    standardMin:{
        type:Number
    },
    students:[
        {
            studentId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"student"
            }
        }
    ],

})

module.exports = mongoose.model("society",societySchema);