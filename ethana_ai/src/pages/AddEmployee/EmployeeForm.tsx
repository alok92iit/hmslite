"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TriangleAlert, User, Mail,  HashIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tableAction } from "@/store/action/table-action";
import { urls } from "@/lib/urls";
import { SET_DEPARTMENT, SET_EMPLOYEE } from "@/store/reducer/table-reducer";
import Api from "@/lib/apis";
import { SET_MODAL } from "@/store/reducer/notify-reducer";

interface EmployeeFormValues {
  name: string;
  employeeId: string;
  email: string;
  departmentId: string;
}

export function EmployeeForm() {
  const departments = useSelector((state: any) => state?.table?.department);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>();
  const onSubmit =async (data: any) => {
   let res = await Api.post({ data, url: urls.employee });
    if (res.status != 201) {

    } else {
      dispatch(SET_MODAL(false));
      dispatch(tableAction.getTable(urls.employee, SET_EMPLOYEE));
    }
  };
  useEffect(() => {
    dispatch(tableAction.getTable(urls.departments, SET_DEPARTMENT));

  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Employee Name */}
      <div className="space-y-2">
        <Label className="text-zinc-950">Employee Name</Label>

        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Enter employee name"
            className="pl-10"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />
        </div>

        {errors.name && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <TriangleAlert className="w-4 h-4" />
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-950">Employee Id</Label>

        <div className="relative">
          <HashIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Enter employee Id"
            className="pl-10"
            {...register("employeeId", {
              required: "employee Id is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
        </div>

        {errors.employeeId && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <TriangleAlert className="w-4 h-4" />
            {errors.employeeId.message}
          </p>
        )}
      </div>

      {/* Employee Email */}
      <div className="space-y-2">
        <Label className="text-zinc-950">Employee Email</Label>

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            type="email"
            placeholder="Enter employee email"
            className="pl-10"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>

        {errors.email && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <TriangleAlert className="w-4 h-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Department Select */}
      <div className="space-y-2">
        <Label className="text-zinc-950">Department</Label>

        <Controller
          name="departmentId"
          control={control}
          rules={{ required: "Department is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>

              <SelectContent>
                {departments.map((dept:any) => (
                  <SelectItem key={dept?._id} value={dept?._id}>
                    {dept?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.departmentId && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <TriangleAlert className="w-4 h-4" />
            {errors.departmentId.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Create Employee
      </Button>
    </form>
  );
}
