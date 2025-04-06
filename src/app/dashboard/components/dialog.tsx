"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Combobox } from "./combo-box";
import { DatePickerDemo } from "@/components/date-picker";
import { db } from "../../../lib/firebaseConfig";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

const initialFormData = {
    name: "",
    email: "",
    avatar: "",
    gender: "",
    department: "",
    doj: "",
    phone: "",
  };
  
  export function DialogForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [showSucssessMsg, setShowSucssessMsg] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    // const handleSubmit = async () => {
    //   setLoading(true);
    //   try {
    //     await addDoc(collection(db, "Employee"), { formData });
    //     setShowSucssessMsg(true);
    //   } catch (error) {
    //     console.error("Firebase Error:", error);
    //   }
    //   // Reset form fields
    //   setFormData(initialFormData);
    //   setLoading(false);
    //   setOpen(false);
    // };



    const addEmployeeWithAutoId = async () => {
      setLoading(true);
      const employeesRef = collection(db, "Employee");
      const querySnapshot = await getDocs(employeesRef);
    
      let maxId = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id > maxId) {
          maxId = data.id;
        }
      });
    
      const newId = maxId + 1;
    
      await setDoc(doc(db, "Employee", newId.toString()), {
        id: newId,
        ...formData,
        timestamp: new Date().toISOString(),
      });
      console.log("Employee added with ID:", newId);
      // Reset form fields
      setFormData(initialFormData);
      setLoading(false);
      setOpen(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={16} /> Add Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
          {showSucssessMsg ? <DialogTitle>Successfully added</DialogTitle> : ''}
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>
              Add a new employee to the shape. Click submit when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="col-span-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <div className="col-span-3">
                <Combobox
                  value={formData.gender}
                  onChange={(val) => setFormData({ ...formData, gender: val })}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="">
                Department
              </Label>
              <Input
                id="department"
                placeholder="CRSI-SM"
                value={formData.department}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doj" className="text-right">
                DOJ
              </Label>
              <div className="col-span-3">
                <DatePickerDemo
                  value={formData.doj}
                  onChange={(val) => setFormData({ ...formData, doj: val })}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={addEmployeeWithAutoId}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }