import { AppModal } from "@/components/ui/app-modal";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Trash2, UserIcon } from "lucide-react";

import { EmployeeForm } from "./EmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { SET_MODAL } from "@/store/reducer/notify-reducer";
import { useEffect } from "react";
import { tableAction } from "@/store/action/table-action";
import { urls } from "@/lib/urls";
import { SET_EMPLOYEE } from "@/store/reducer/table-reducer";
import { DataTable } from "@/components/ui/data-table";
import Swal from "sweetalert2";
import Api from "@/lib/apis";
const AddEmployee = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state?.table?.employee);
  const onDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await Api.delete({
          url: `${urls.employee}/${id}`,
          data: {},
          contentType: "application/json",
          show: 1,
        });
        if (res.status !== 200) {
          console.error("Failed to delete user:", res);
          //  Swal.fire({
          //      title: "Deleted!",
          //      text: "Record has been deleted.",
          //      icon: "success",
          //    });
          return;
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Record has been deleted.",
            icon: "success",
          });
           dispatch(tableAction.getTable(urls.employee, SET_EMPLOYEE));
        }
      }
    });
  };
  const employeeColumn = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "employeeId",
      header: "Employee Id",
    },
    {
      accessorKey: "createdAt",
      header: "Registration Date",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }: any) => {
        const employee = row.original;

        return (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(employee._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(tableAction.getTable(urls.employee, SET_EMPLOYEE));
  }, []);
  return (
    <div>
      <SectionHeading
        title="Employee Management"
        //   subtitle="Manage user accounts and permissions"
        icon={<UserIcon className="w-5 h-5" />}
        //    badge="248 Active"
        action={
          <Button variant={"dark"} onClick={() => dispatch(SET_MODAL(true))}>
            Add Employee
          </Button>
        }
      />
      <DataTable columns={employeeColumn} data={employees} />
      <AppModal heading="Add Employee" body={<EmployeeForm />} />
    </div>
  );
};

export default AddEmployee;
