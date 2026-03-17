import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, UserCheck, UserX, Search, CheckCircle2, XCircle, Trophy, Target } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { tableAction } from '@/store/action/table-action';
import { urls } from '@/lib/urls';
import { SET_DEPARTMENT, SET_EMPLOYEE, SET_MATRIX } from '@/store/reducer/table-reducer';
import Api from '@/lib/apis';

import { AppModal } from '@/components/ui/app-modal';
import { SET_MODAL } from '@/store/reducer/notify-reducer';

type AttendanceStatus = 'present' | 'absent' | null;

interface Employee {
  _id: string;
  name: string;
  department: string;
  status: AttendanceStatus;
  streak: number;
  avatar: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
  delay: number;
  subtitle?: string;
  data:any[]
}

export default function HRAttendanceDashboard() {

  const dispatch =useDispatch()
  const employees=useSelector((state:any)=>state.table.employee)
  const matrix=useSelector((state:any)=>state.table.matrix)
  console.log("dklwenfjberoinfver=",matrix)
  const [render,setRender]=useState(0)
  // const [employees, setEmployees] = useState<Employee[]>([
  //   { _id: 1, name: "Sarah Johnson", department: "Engineering", status: null, streak: 15, avatar: "👩‍💻" },
  //   { _id: 2, name: "Michael Chen", department: "Design", status: null, streak: 8, avatar: "👨‍🎨" },
  //   { _id: 3, name: "Emily Rodriguez", department: "Marketing", status: null, streak: 22, avatar: "👩‍💼" },
  //   { _id: 4, name: "David Kim", department: "Engineering", status: null, streak: 5, avatar: "👨‍💻" },
  //   { _id: 5, name: "Jessica Taylor", department: "HR", status: null, streak: 30, avatar: "👩‍💼" },
  //   { _id: 6, name: "James Wilson", department: "Sales", status: null, streak: 12, avatar: "👨‍💼" },
  //   { _id: 7, name: "Lisa Anderson", department: "Finance", status: null, streak: 18, avatar: "👩‍💼" },
  //   { _id: 8, name: "Robert Brown", department: "Engineering", status: null, streak: 7, avatar: "👨‍💻" },
  //   { _id: 9, name: "Maria Garcia", department: "Design", status: null, streak: 25, avatar: "👩‍🎨" },
  //   { _id: 10, name: "Christopher Lee", department: "Marketing", status: null, streak: 14, avatar: "👨‍💼" },
  // ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDept, setFilterDept] = useState<string>("All");

  const [ModelBody,setBody]=useState(<AttandanceDetail/>)
  const presentCount: number = matrix?.presentEmployees? matrix?.presentEmployees?.length:0;
  const absentCount: number =  matrix?.absentEmployees? matrix?.absentEmployees?.length:0;
  const unmarkedCount: number = matrix?.notMarked? matrix?.notMarked?.length:0
  const attendanceRate: string = employees.length > 0 ? ((presentCount / employees.length) * 100).toFixed(1) : '0';

  const departments: any[] = ["All", ...new Set(employees.map((emp:any) => emp.department))];

  const filteredEmployees: Employee[] = matrix?.notMarked?.filter((emp:any) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "All" || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const markAttendance =async (employeeId: string, status: AttendanceStatus) => {
    await Api.patch({ data: {employeeId:employeeId,status:status=="present"?1:0}, url: urls.attandance });
    
    setRender(prev=>prev+1)
    // setEmployees(prev => prev.map(emp => {
    //   if (emp._id === employeeId) {
    //     const updatedEmp = { ...emp, status };
        
    //     // Trigger celebration for present marking with high streak
    //     if (status === 'present' ) {
          
    //       // setCelebrationEmployee(emp);
    //       // setShowCelebration(true);
    //       setTimeout(() => setShowCelebration(false), 3000);
    //     }
        
    //     return updatedEmp;
    //   }
    //   return emp;
    // }));
  };

 

  const detail=async(data:any[],status:string)=>{
    setBody(<AttandanceDetail status={status} filteredEmployees={data}/> )
    dispatch(SET_MODAL(true))
  }
  const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, delay, subtitle,data }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={()=>detail(data,title)}
    >
      <Card className="relative overflow-hidden border-gray-200 bg-white shadow-sm">
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 blur-3xl`}></div>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-gray-900"
          >
            {value}
          </motion.div>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );

  useEffect(()=>{
   dispatch(tableAction.getTable( urls.departments, SET_DEPARTMENT))
   dispatch(tableAction.getTable( urls.employee, SET_EMPLOYEE))
   dispatch(tableAction.getTable( urls.attandanceMatrix, SET_MATRIX))
  },[render])

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between"
        >
          <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">HR Attendance Dashboard</h1>
          <p className="text-gray-600">Manage team attendance and track engagement</p>
            
          </div>
          

          
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={employees.length}
            icon={Users}
            color="bg-blue-500"
            delay={0}
            data={employees}
          />
          <StatCard
            title="Present Today"
            value={presentCount}
            icon={UserCheck}
            color="bg-green-500"
            delay={0.1}
            data={matrix?.presentEmployees}
            
          />
          <StatCard
            title="Absent Today"
            value={absentCount}
            icon={UserX}
            color="bg-red-500"
            delay={0.2}
            data={matrix?.absentEmployees}
          />
          <StatCard
            title="Unmarked"
            value={unmarkedCount}
            icon={Target}
            color="bg-amber-500"
            delay={0.3}
              data={matrix?.notMarked}
          />
        </div>

        {/* Celebration Overlay */}
        

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-gray-200 bg-white shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      onClick={() => setFilterDept(dept)}
                      variant="outline"
                      className={`${
                        filterDept === dept
                          ? 'bg-blue-100 text-blue-700 border-blue-300'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {dept}
                    </Button>
                  ))}
                </div>
              </div>


             

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Today's Attendance Progress</span>
                  <span>{presentCount}/{employees.length} ({attendanceRate}%)</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attendanceRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Employee List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Unmarked Employee's Attendance</CardTitle>
              <CardDescription className="text-gray-600">
                {filteredEmployees?.length} employee{filteredEmployees?.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredEmployees?.map((employee, index) => (
                  <motion.div
                    key={employee._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className={`p-4 rounded-lg border transition-all ${
                      employee.status === 'present'
                        ? 'bg-green-50 border-green-200'
                        : employee.status === 'absent'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{employee.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-gray-600">{employee.department}</p>
                            {employee.streak >= 10 && (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                                🔥 {employee.streak} day streak
                              </Badge>
                            )}
                            {employee.streak >= 30 && (
                              <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                                <Trophy className="w-3 h-3 mr-1" />
                                Champion
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => markAttendance(employee._id, 'present')}
                            size="sm"
                            className={`${
                              employee.status === 'present'
                                ? 'bg-green-600 hover:bg-green-500 text-white'
                                : 'bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Present
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => markAttendance(employee._id, 'absent')}
                            size="sm"
                            variant="outline"
                            className={`${
                              employee.status === 'absent'
                                ? 'bg-red-600 border-red-500 hover:bg-red-500 text-white'
                                : 'bg-white border-gray-300 hover:bg-red-600 hover:border-red-500 hover:text-white text-gray-700'
                            }`}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Absent
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          {/* <Card className="border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Top Performers (by Streak)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...employees]
                  .sort((a, b) => b.streak - a.streak)
                  .slice(0, 5)
                  .map((employee, index) => (
                    <motion.div
                      key={employee._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-amber-400 text-amber-900' :
                          index === 1 ? 'bg-gray-300 text-gray-700' :
                          index === 2 ? 'bg-orange-400 text-orange-900' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="text-2xl">{employee.avatar}</span>
                        <span className="font-semibold text-gray-900">{employee.name}</span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        🔥 {employee.streak} days
                      </Badge>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card> */}
        </motion.div>
        <AppModal
      
              heading="Employee Attandance"
              body={ModelBody }
            />
      </div>
      
    </div>
  );
}




const AttandanceDetail=({filteredEmployees,status}:any)=>{

  return (
    <div className="">
            <CardHeader>
              <CardTitle className="text-gray-900">{status}</CardTitle>
              <CardDescription className="text-gray-600">
                {filteredEmployees?.length} employee{filteredEmployees?.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredEmployees?.map((employee:any, index:any) => (
                  <motion.div
                    key={employee._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className={`p-4 rounded-lg border transition-all ${
                      employee.status === 'present'
                        ? 'bg-green-50 border-green-200'
                        : employee.status === 'absent'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{employee.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-gray-600">{employee.department}</p>
                            {employee.streak >= 10 && (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                                🔥 {employee.streak} day streak
                              </Badge>
                            )}
                            {employee.streak >= 30 && (
                              <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                                <Trophy className="w-3 h-3 mr-1" />
                                Champion
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <p className='text-sm'>{employee.createdAt}</p>
                        </motion.div>
                        {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => markAttendance(employee._id, 'absent')}
                            size="sm"
                            variant="outline"
                            className={`${
                              employee.status === 'absent'
                                ? 'bg-red-600 border-red-500 hover:bg-red-500 text-white'
                                : 'bg-white border-gray-300 hover:bg-red-600 hover:border-red-500 hover:text-white text-gray-700'
                            }`}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Absent
                          </Button>
                        </motion.div> */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </div>
  )
}