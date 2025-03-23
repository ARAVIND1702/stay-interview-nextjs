import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Envelope, Telephone } from "@mynaui/icons-react";
import StayInterviewForm from "./interview-form";


interface TeamMemberCardProps {
  name: string;
  email: string;
  avatar: string;
  gender: string;
  department: string;
  doj: string;
  phone: string;
}

export function TeamMemberCard({ name, email, avatar, department, doj, phone }: TeamMemberCardProps) {
  return (
    <Card className="w-64 p-4 py-10 flex flex-col items-center bg-zinc-950 text-zinc-50 border-zinc-700">
      {/* Avatar */}
      <Avatar className="h-16 w-16 mb-3">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* Name & Email */}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{email}</p>

      {/* department, DOJ, Phone in a darker box */}
      <CardContent className="w-full mt-3 p-3 space-y-2 rounded-lg text-sm">
      <div className="flex flex-col gap-6 justify-between">
        <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between">
          <p className="font-medium">Department</p>
          <p className="font-medium">{department}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-medium">Date Joined</p>
          <p className="font-medium">{doj}</p>
        </div>
        </div>
        <div className="flex flex-col justify-between space-y-2">
        <p className="flex items-center ">
          <span className="font-medium pr-2" ><Envelope size="16" /></span> {email}
        </p>
        <p className="flex items-center ">
          <span className="font-medium pr-2"><Telephone size="16"/></span> {phone}
        </p>
        </div>
        <StayInterviewForm/>
        </div>
      </CardContent>
    </Card>
  );
}
