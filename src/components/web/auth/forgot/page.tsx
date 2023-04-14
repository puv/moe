import { AuthInput, AuthOther } from '@/components/Auth'
import { Button } from '@/components/Button'
import Auth from '@/components/partials/Auth'

export default function ForgotPageComponent() {
    return (
        <Auth title="Recover your password">
            <AuthInput type="email" name="email" text="Email" placeholder="email@example.com" match="" />
            <Button size="lg" className="w-full" variant="outline" type="submit">Reset password</Button>
            <AuthOther text="Don't have an account?" to="/auth/signup" toText="Sign up" />
        </Auth>
    );
}