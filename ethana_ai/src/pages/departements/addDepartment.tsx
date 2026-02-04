"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TriangleAlert, Building2 } from "lucide-react";
import Api from "@/lib/apis";
import { urls } from "@/lib/urls";
import { useDispatch } from "react-redux";
import { tableAction } from "@/store/action/table-action";
import { SET_DEPARTMENT } from "@/store/reducer/table-reducer";
import { SET_MODAL } from "@/store/reducer/notify-reducer";

interface DepartmentFormValues {
  department: string;
}

export function DepartmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormValues>();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    console.log("frenfkernlgkntrg===", data);
    let res = await Api.post({ data, url: urls.departments });
    if (res.status != 201) {
    } else {
      dispatch(SET_MODAL(false));
      dispatch(tableAction.getTable(urls.departments, SET_DEPARTMENT));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Department Field */}
      <div className="space-y-2">
        <Label htmlFor="department" className="text-zinc-950">
          Department Name
        </Label>

        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            id="department"
            type="text"
            placeholder="Enter department name"
            className="pl-10 text-zinc-950 placeholder:text-slate-400"
            {...register("department", {
              required: "Please enter department name",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Maximum 30 characters",
              },
            })}
          />
        </div>

        {errors.department && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <TriangleAlert className="w-4 h-4" />
            <span>{errors.department.message}</span>
          </p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Create Department
      </Button>
    </form>
  );
}
