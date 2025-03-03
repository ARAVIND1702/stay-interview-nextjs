
import { Navbar } from "@/components/ui/navbar";
import "../globals.css"; // Ensure this path is correct


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
    <Navbar/> 
    {children}
    </div>
  );
}
