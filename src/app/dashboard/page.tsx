import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TeamMemberCard } from "./components/employee-card";
import { DialogForm } from "./components/dialog";
import StayInterviewForm from "./components/interview-form";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {" "}
      {/* Limits width & centers */}
      <div className="flex justify-between items-center p-y-10">
        <h2 className="text-3xl font-bold text-white">Total Employees: 23</h2>
        <div className="flex items-center gap-4">
          {/* <Button className="flex items-center gap-2">
            <Plus size={16} /> Add Employee
          </Button> */}
          <DialogForm/>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>
      <div className=" py-10">
        <TeamMemberCard
          name="Aravind RM"
          email="m@example.com"
          avatar="https://ui.shadcn.com/avatars/02.png"
          department="GDS"
          doj="Jan 5, 2022"
          phone="+1 234 567 890" 
          gender={""}        />
      </div>
    </div>
  );
}
