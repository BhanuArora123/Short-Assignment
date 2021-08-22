const mongoose = require("mongoose");
const schema = mongoose.Schema;

const student = new schema({
    name:{
        type:String,
        required:true
    },
    standard:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    subjects:[
        {
            subjectId :{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"subject"
            }
        }
    ],
    societies:[
        {
            societyId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"society"
            }
        }
    ]
})
module.exports = mongoose.model("student",student);