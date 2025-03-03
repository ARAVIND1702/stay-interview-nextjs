"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import userAvatar from "@/assets/avatar/avatar-placeholder.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
// import { text } from "stream/consumers";

export function Navbar() {
  const router = useRouter();
  const user = auth.currentUser; // Get logged-in user

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-zinc-950 p-4 flex justify-between items-center">
      {/* Left Side - Branding */}
      <h1 className="text-4xl font-bold font-mono text-white">B/S/H/</h1>

      {/* Right Side - User Avatar, Name, and Logout */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-6 cursor-pointer">
              <span className=" font-bold font-mono text-xl text-white">
                {user?.displayName || "Guest"}
              </span>
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={user?.photoURL || "/avatars/avatar-placeholder.png"}
                  alt="User Avatar"
                />
                <AvatarFallback className="text-2xl">
                  {user?.displayName?.charAt(0) || "G"}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-900 border border-zinc-800 text-white shadow-lg"
          >
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-400 hover:bg-red-500 hover:text-white"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
