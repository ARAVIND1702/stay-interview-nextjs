"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DonutChart from "./donutchart";

const data = [
    { name: "Good", value: 40, color: "#22c55e" }, // Green
    { name: "Intermediate", value: 35, color: "#facc15" }, // Yellow
    { name: "Bad", value: 25, color: "#ef4444" }, // Red
];

interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    doj: string;
    gender: string;
    phone: string;
}

interface Feedback {
    employee: number;
    comment: string;
    timestamp: string;
    feedback: Feedbackdata[];
}
interface Feedbackdata {
    questionId: number;
    rating: number;
}

export default function EmployeeReport() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
    const [employeeCategories, setEmployeeCategories] = useState<{ [key: string]: string }>({});
    const [ratingDataFormat, setRatingDataFormat] = useState<{ name: string; value: number; color: string }[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Employee"));
                const userData = querySnapshot.docs.map((doc) => ({
                    ...(doc.data() as Employee),
                }));
                setEmployees(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };


        const fetchEmployeeRatings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "employeeFeedback"));
                const userData = querySnapshot.docs.map((doc) => ({
                    ...(doc.data() as Feedback),
                }));
                setFeedbackData(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
        fetchEmployeeRatings();
    }, []);


    useEffect(() => {
        if (employees.length > 0 && feedbackData.length > 0) {
            const categories: { [key: string]: string } = {};
            let updatedRatingData: { name: string; value: number; color: string }[] = [];
            employees.forEach((employee) => {
                const feedback = feedbackData.find((f) => f.employee === Number(employee.id));
                let calcAvgRating = 0;
                if (feedback && feedback.feedback) {
                    const avgRating = Object.keys(feedback.feedback).map((key) => (feedback.feedback as unknown as Record<string, number>)[key]);
                    calcAvgRating = avgRating.reduce((sum, rating) => sum + rating, 0) / avgRating.length;
                    categories[employee.id] = calcAvgRating >= 3.5 ? "Good" : (calcAvgRating >= 2 && calcAvgRating < 3.5) ? "Intermediate" : "Bad";
                } else {
                    categories[employee.id] = "Not Rated";
                }

                updatedRatingData.push({
                    name: employee.name,
                    value: calcAvgRating,
                    color: calcAvgRating >= 3.5 ? "#22c55e" : calcAvgRating >= 2 ? "#facc15" : "#ef4444", // Green, Yellow, Red
                });
            });

            setEmployeeCategories(categories);
            setRatingDataFormat(updatedRatingData);
        }
    }, [employees, feedbackData]);

    return (
        <div className="flex">
            <div className="border-2 border-solid w-full">
                <div className="flex justify-between items-center p-y-10 p-8">
                    <h2 className="text-2xl font-bold text-white">Employees</h2>
                </div>
                {employees.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-3 ">
                        <div className="w-20 pl-2">
                            <Avatar className="h-16 w-16 mb-3">
                                <AvatarImage src="https://ui.shadcn.com/avatars/02.png" alt={item.name} />
                            </Avatar>
                        </div>
                        <div className="w-64 pl-2">
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.email}</p>
                        </div>
                        <div className="w-32 pl-2">
                            <p className="text-sm text-muted-foreground">{employeeCategories[item.id] || "Calculating..."}</p>
                        </div>
                    </div>
                ))};
            </div>

            <div className="border-2 border-solid w-full">
                <div>
                    <DonutChart chartData={ratingDataFormat}/>
                </div>
            </div>
        </div>
    )
}