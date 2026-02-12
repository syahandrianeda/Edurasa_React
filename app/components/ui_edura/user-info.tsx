import { useInitials } from "~/hooks/use-initials";
import type { User } from "~/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserInfo<T extends User>({
    user,
    showEmail = false,
}: {
    user: T;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();
    
    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                {user.avatar?(
                        <img src={user.avatar} className="aspect-square size-full bg-radial from-sky-400 to-20% shadow-lg shadow-sky-700" alt="profile poto" referrerPolicy="no-referrer"/>
                    ):(
                        <AvatarImage src={user.avatar} alt={user.name} referrerPolicy="no-referrer"/>
                    )   
                }
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight self-center">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
