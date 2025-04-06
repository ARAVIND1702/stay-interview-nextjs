import "../globals.css"; // Ensure this path is correct
import { Navbar } from "@/components/ui/navbar";

export const metadata = {
  title: "Login | Stay Interview",
  description: "Login page for the Stay Interview system.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
}
