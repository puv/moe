import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import Loading from '@/components/partials/Loading'

export default function Component() {
    const { data: sessionData, status: sessionStatus } = useSession();

    if (sessionStatus === 'loading' || sessionStatus == undefined) {
        return <>
            <div className={`grid h-full w-full items-center`}>
                <Loading />
            </div>
        </>
    }

    return (
        (sessionData?.user) ? <AuthHome /> : <AnonHome />
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

    console.log("popular", popular);

    return (
        <div>{session?.user?.name} balloon </div>
    );
}