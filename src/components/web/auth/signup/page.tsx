import { AuthInput, AuthOther } from '@/components/Auth'
import { Button } from '@/components/Button'
import Auth from '@/components/partials/Auth'
import { useEffect, useState, useRef } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

async function createUser(username: string, email: string, password: string) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}

export default function SignUpPageComponent() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);


    const [registered, setRegistered] = useState(false)
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event: any) {
        event.preventDefault();

        const enteredUsername: null | string = usernameInputRef.current!['value'];
        const enteredEmail: string = emailInputRef.current!['value'];
        const enteredPassword: string = passwordInputRef.current!['value'];

        try {
            const result = await createUser(enteredUsername!, enteredEmail!, enteredPassword);
            setRegistered(true)

            await signIn('credentials', {
                redirect: true,
                email: enteredEmail,
                password: enteredPassword,
            });

            console.log("Completed");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Auth onSubmit={submitHandler} title="Sign up for an account">
            <AuthInput type="text" wref={usernameInputRef} name="username" text="Username" placeholder="Username" match="" />
            <AuthInput type="email" wref={emailInputRef} name="email" text="Email" placeholder="email@example.com" match="" />
            <AuthInput type="password" wref={passwordInputRef} name="password" text="Password" placeholder="********" match="" />
            <Button size="lg" className="w-full" variant="outline" type="submit">Sign Up</Button>
            <AuthOther text="Already have an account?" to="/auth/signin" toText="Sign in" />
        </Auth>
    );
}