import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';

export default function Component() {
    const { data: session } = useSession();

    console.log("home session", session)

    return (
        (session?.user) ? <AuthHome /> : <AnonHome />
    );
}

function AnonHome() {
    const [popular, setPopular] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { data } = await fetch('/api/v1/anime/popular', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json());

            setPopular(data);
        }

        fetchData();
    }, []);

    console.log(popular);

    return (
        <div>unauthenticated</div>
    );
}

function AuthHome() {
    const { data: session } = useSession();
    return (
        <div>{session?.user?.name} balloon </div>
    );
}