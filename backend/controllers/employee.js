const { ObjectId } = require("bson");
const Employee = require("../models/Employee");
const { currentTimeStamp } = require("../utils/times");


const allEmployee = async (req, res) => {
    const query = [
        {
    '$lookup': {
      'from': 'departments', 
      'localField': 'departmentId', 
      'foreignField': '_id', 
      'as': 'department'
    }
  }, {
    '$unwind': {
      'path': '$department'
    }
  }, {
    '$addFields': {
      'department': '$department.name'
    }
  },
        {
            '$addFields': {
                'createdAt': {
                    '$dateToString': {
                        'format': '%d-%m-%Y',
                        'date': {
                            '$toDate': '$createdAt'
                        }
                    }
                },

            }
        }
    ]
    let employees = await Employee.aggregate(query)

    res.status(200).json({ msg: "all records", data: employees });
}


const addEmployee = async (req, res) => {
    try {
        req.body.createdAt = currentTimeStamp()
        let employee = await Employee(req.body)
        await employee.save()
        res.status(201).json({ msg: "Record added" })
    }
    catch (err) {
        if (err.code === 11000) {
           
            return res.status(400).json({
                
                msg: `Email Id already exists.`,
            });
        }

     
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                
                msg: `this are required field ${errors}`,
            
            });
        }
    }

}


const deleteEmpoyee = async (req, res) => {
    try {

        let { id } = req.params
        let resp = await Employee.deleteOne({ "_id": new ObjectId(id) })
        res.status(200).json({ "msg": "Record deleted" })
    }
    catch (err) {
        res.status(400).json({ msg: "Please provide correct employee id" })
    }
}
const updateEmployee = async (req, res) => {
    try {

        let { id } = req.params
        let { name, email, department } = req.body
        let employee = await Employee.updateOne({ "_id": new ObjectId(id) }, { "$set": { name, email, department } }, { upsert: false });
        res.status(200).json({ "msg": "Record updated" })
    }
    catch (err) {
        res.status(400).json({ msg: "Please provide correct employee id" })
    }
}
module.exports = { allEmployee, addEmployee, deleteEmpoyee, updateEmployee };