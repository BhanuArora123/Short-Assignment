const student = require("../models/studentModel");
const society = require("../models/societyModel");
const subject = require("../models/subject");

exports.addStudent = (req,res,next) => {
    let name = req.body.name;
    let standard = req.body.standard;
    let contact = req.body.contact;
    let year = new Date().getFullYear();
    let societies = req.body.societies;
    let subjects = req.body.subjects;
    console.log(subjects);
    let studentData = new student({
        name:name,
        standard:parseInt(standard),
        contact:parseInt(contact),
        year:year
    });
    for (let i = 0; i < societies.length; i++) {
        const element = societies[i];
        society.findOne({
            name:element
        })
        .then((societyData) => {
            societyData.students.push({
                studentId:studentData._id
            })
            console.log(societyData._id)
            studentData.societies.push({
                societyId:societyData._id
            })
            return societyData.save();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    for (let i = 0; i < subjects.length; i++) {
        const element = subjects[i];
        subject.findOne({
            name:element
        })
        .then((subjectData) => {
            subjectData.students.push({
                studentId:studentData._id
            })
            studentData.subjects.push({
                subjectId:subjectData._id
            })
            return subjectData.save();
        })
        .then(() => {
            if(i == subjects.length - 1){
                // so as to save it only when async tasks are done
                studentData.save();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return res.status(201).json({
        msg:"student registered successfully !"
    })
}
exports.getDynamicData = (req,res,next) => {
    const standard = parseInt(req.body.standard);
    console.log(standard)
    let activity ;
    society.find({
        standardMax:{
            $gte:standard
        },
        standardMin:{
            $lte:standard
        }
    })
    .then((activities) => {
        activity = activities;
        return subject.find({
            standardMax:{
                $gte:standard
            },
            standardMin:{
                $lte:standard
            }
        })
    })
    .then((subjects) => {
        return res.status(200).json({
            societies:activity,
            subjects:subjects
        })
    } )
    .catch((err) => {
        console.log(err);
    })
}
exports.getAllData = (req,res,next) => {
    let societies ;
    society.find()
    .then((societyArray) => {
        societies = societyArray;
        return subject.find();
    })
    .then((subjects) => {
        return res.status(200).json({
            subjects:subjects,
            societies:societies
        })
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.getQuery = async (req,res,next) => {
    let queryObj = req.body.query;
    let societyData;
    if(queryObj.society != "Societies"){
        societyDoc = await society.findOne({
            name:queryObj.society
        })
        .populate("students.studentId");
        societyData = societyDoc.students;
    }
    else{
        societyData = await student.find();
    }
    let filteredData;
    console.log(queryObj);
    if(queryObj.class != "Class"){
        filteredData = societyData.filter(stud => {
            console.log(stud);
            let comp = stud.studentId;
            if(!comp){
                comp = stud;
            }
            if(comp.standard == parseInt(queryObj.class)){
                console.log("hello")
                return stud;
            }
        });
        console.log(filteredData);
    }
    else{
        filteredData = societyData;
    }
    return res.status(200).json({
        filteredData:filteredData
    });
}