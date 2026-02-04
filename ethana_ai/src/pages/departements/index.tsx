import { AppModal } from "@/components/ui/app-modal";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Building2,  } from "lucide-react";
import  { useEffect,  } from "react";
import { DepartmentForm } from "./addDepartment";
import { useDispatch, useSelector } from "react-redux";
import { tableAction } from "@/store/action/table-action";
import { SET_DEPARTMENT } from "@/store/reducer/table-reducer";
import { urls } from "@/lib/urls";
import { DataTable } from "@/components/ui/data-table";
import { SET_MODAL } from "@/store/reducer/notify-reducer";

const Department = () => {
  // const [open, setOpen] = useState(false);
  const dispatch=useDispatch()
  const departments=useSelector((state:any)=>state?.table?.department)
  console.log("fmerklngvkrt=",departments)
  const departmentColumns=[
    {
    accessorKey: "name",
    header: "Name",
  },
  ]
  useEffect(()=>{
    dispatch(tableAction.getTable( urls.departments, SET_DEPARTMENT))
  },[])
  return (
    <div>
      {" "}
      <SectionHeading
        title="Department Management"
        //   subtitle="Manage user accounts and permissions"
        icon={<Building2 className="w-5 h-5" />}
        //    badge="248 Active"
        action={
          <Button variant={"dark"} onClick={() =>  dispatch(SET_MODAL(true))}>
            Add Department
          </Button>
        }
      />

      <DataTable
  columns={departmentColumns}
  data={departments}
/>
      <AppModal

        heading="Add Department"
        body={<DepartmentForm />}
      />
    </div>
  );
};

export default Department;
