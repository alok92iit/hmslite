const Department = require("../models/Department");


const allDepartment=async(req,res)=>{
    let departments =await Department.find({})
    res.status(200).json({ msg: '',data:departments });
}

const addDepartment=async(req,res)=>{
    let {department}=req.body
    const newUser = new Department({name:department});
        await newUser.save()
        res.status(201).json({ msg: 'Department added successfully' });
}

module.exports={allDepartment,addDepartment}