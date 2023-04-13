import { AuthInput, AuthOther } from '@/pages/components/Auth'
import { Button } from '@/pages/components/Button'
import Auth from '@/pages/components/partials/Auth'

export default function Component() {
    return (
        <Auth title="Sign up for an account">
            <AuthInput type="text" name="Username" text="Username" placeholder="Username" match="" />
            <AuthInput type="Email" name="Email" text="Email" placeholder="email@example.com" match="" />
            <AuthInput type="Password" name="Password" text="Password" placeholder="********" match="" />
            <Button size="lg" className="w-full" variant="outline" type="submit">Sign Up</Button>
            <AuthOther text="Already have an account?" to="/auth/signin" toText="Sign in" />
        </Auth>
    );
}