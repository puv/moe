import { AuthInput, RememberMe, AuthOther } from '@/components/Auth'
import { Button } from '@/components/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Auth from '@/components/partials/Auth';
import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignInPageComponent() {

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


    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event: any) {
        event.preventDefault();

        const enteredEmail: string = emailInputRef.current!.value;
        const enteredPassword: string = passwordInputRef.current!.value;

        await signIn('credentials', {
            redirect: true,
            email: enteredEmail,
            password: enteredPassword,
        });
    }

    return (
        <Auth title="Sign in to your account">
            <AuthInput type="email" wref={emailInputRef} name="email" text="Email" placeholder="email@example.com" match="" />
            <AuthInput type="password" wref={passwordInputRef} name="password" text="Password" placeholder="********" match="" />
            <div className="flex items-center justify-between">
                <RememberMe />
                <Link to="/auth/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
            </div>
            <Button size="lg" className="w-full" variant="outline" type="submit">Sign In</Button>
            <AuthOther text="Don't have an account?" to="/auth/signup" toText="Sign up" />
        </Auth>
    );
}