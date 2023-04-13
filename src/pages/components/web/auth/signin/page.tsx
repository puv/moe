import { AuthInput, RememberMe, AuthOther } from '@/src/pages/components/Auth'
import { Button } from '@/src/pages/components/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Auth from '@/src/pages/components/partials/Auth';

export default function Component() {
    return (
        <Auth title="Sign in to your account">
            <AuthInput type="Email" name="Email" text="Email" placeholder="email@example.com" match="" />
            <AuthInput type="Password" name="Password" text="Password" placeholder="********" match="" />
            <div className="flex items-center justify-between">
                <RememberMe />
                <Link to="/auth/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
            </div>
            <Button size="lg" className="w-full" variant="outline" type="submit">Sign In</Button>
            <AuthOther text="Don't have an account?" to="/auth/signup" toText="Sign up" />
        </Auth>
    );
}