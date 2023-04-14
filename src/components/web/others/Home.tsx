import { useSession } from "next-auth/react";

export default function Component() {
    const { data: session } = useSession();
    return (
        <div>{session?.user?.name} balloon </div>
    );
}