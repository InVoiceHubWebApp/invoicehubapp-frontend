import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import type { User } from "../_types/user";

type UserProps = {
  user: User;
};

export function User({ user }: UserProps) {
  return (
    <div className="flex justify-between items-center p-6">
      <Avatar>
        <AvatarFallback>
          {user.name.charAt(0)}
          {user.lastname.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h2>
        {user.name} {user.lastname}
      </h2>
      <LogOut strokeWidth={2.25} size={20} />
    </div>
  );
}
