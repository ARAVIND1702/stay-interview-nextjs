"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TeamMemberCard } from "./components/employee-card";
import { DialogForm } from "./components/dialog";
import { collection, getDocs  } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import EmployeeReport from "./components/report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  doj: string;
  gender: string;
  phone: string;
}

export default function DashboardPage() {

  const [employee, setEmployee] = useState<Employee[]>([]);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Employee"));
        const userData = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Employee),
        }));
        setEmployee(userData);
        setEmployeeCount(userData.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Tabs  defaultValue="employees" className="max-w-screen-xl mx-auto p-4 bg-slate-50 ">
 <div className="flex justify-center mb-6">
    <TabsList>
      <TabsTrigger value="employees">Employees</TabsTrigger>
      <TabsTrigger value="reports">Reports</TabsTrigger>
    </TabsList>
  </div>

  <TabsContent value="employees">
      {/* Limits width & centers */}
      <div className="flex justify-between items-center p-y-10">
        <h2 className="text-2xl font-bold text-zinc-950">Total Employees: {employeeCount}</h2>
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
    <div className="py-10 flex gap-6 flex-wrap">
      {employee.map((item) => (
        <TeamMemberCard
          key={item.id || item.email || Math.random().toString()}
          employeeId={item.id}
          name={item.name}
          email={item.email}
          avatar="https://ui.shadcn.com/avatars/02.png"
          department={item.department}
          doj={item.doj}
          phone={item.phone}
          gender={item.gender}
        />
      ))}
    </div>
  </TabsContent>

  <TabsContent value="reports">
    <EmployeeReport />
  </TabsContent>
</Tabs>

  );
}
