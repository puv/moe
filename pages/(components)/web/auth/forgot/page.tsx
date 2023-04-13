import { AuthInput, AuthOther } from '@/pages/(components)/Auth'
import { Button } from '@/pages/(components)/Button'
import Auth from '@/pages/(components)/partials/Auth'

export default function Component() {
    return (
        <Auth title="Recover your password">
            <AuthInput type="Email" name="Email" text="Email" placeholder="email@example.com" match="" />
            <Button size="lg" className="w-full" variant="outline" type="submit"> Reset password </Button>
            <AuthOther text="Don't have an account?" to="/auth/signup" toText="Sign up" />
        </Auth>
    );
}