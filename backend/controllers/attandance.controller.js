const { ObjectId } = require("bson")
const { Attandance } = require("../models/attandance")
const { currentTimeStamp, getCurrentDateTimeStamp } = require("../utils/times")


const markAttandance = async (req, res) => {
    let { employeeId, status, remark } = req.body
    let attandanceOn = getCurrentDateTimeStamp()
    let createdAt = currentTimeStamp()
    let filter = { employeeId: new ObjectId(employeeId), attandanceOn }
    let record = { employeeId, status, remark, createdAt, attandanceOn }
    await Attandance.updateOne(filter, record, { upsert: true })

    res.status(200).json({ "msg": "Record added" })
}

const matrix = async (req, res) => {

    const query = [
        {
            '$match': {
                'attandanceOn': {
                    '$in': [
                        getCurrentDateTimeStamp()
                    ]
                }
            }
        }, {
            '$lookup': {
                'from': 'employees',
                'localField': 'employeeId',
                'foreignField': '_id',
                'pipeline': [
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
                    }
                ],
                'as': 'employee'
            }
        }, {
            '$unwind': {
                'path': '$employee'
            }
        }, {
            '$addFields': {
                'createdAt': {
                    '$dateToString': {
                        'format': '%d-%m-%Y %H:%M:%S',
                        'date': {
                            '$toDate': '$createdAt'
                        }
                    }
                },
                'name': '$employee.name',
                'email': '$employee.email',
                'department': '$employee.department',
                'departmentId': '$employee.departmentId'
            }
        }, {
            '$group': {
                '_id': null,
                'presentEmployees': {
                    '$addToSet': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$status', 1
                                ]
                            }, {
                                'createdAt': '$createdAt',
                                'employeeId': '$employeeId',
                                'name': '$employee.name',
                                'email': '$employee.email',
                                'department': '$employee.department',
                                'departmentId': '$employee.departmentId'
                            }, '$$REMOVE'
                        ]
                    }
                },
                'absentEmployees': {
                    '$addToSet': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$status', 0
                                ]
                            }, {
                                'createdAt': '$createdAt',
                                'employeeId': '$employeeId',
                                'name': '$employee.name',
                                'email': '$employee.email',
                                'department': '$employee.department',
                                'departmentId': '$employee.departmentId'
                            }, '$$REMOVE'
                        ]
                    }
                },
                'allEmployees': {
                    '$addToSet': '$employeeId'
                }
            }
        }, {
            '$lookup': {
                'from': 'employees',
                'let': {
                    'employeeIds': '$allEmployees'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$not': {
                                    '$in': [
                                        '$_id', '$$employeeIds'
                                    ]
                                }
                            }
                        }
                    }
                ],
                'as': 'notMarked'
            }
        }, {
            '$project': {
                'allEmployees': 0,
                '_id': 0
            }
        }
    ]
    let matrix=await Attandance.aggregate(query)
    res.status(200).json({data:matrix?.length>0?matrix[0]:{}})

}


module.exports = { markAttandance,matrix }