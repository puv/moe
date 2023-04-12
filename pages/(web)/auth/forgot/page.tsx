import { AuthInput, AuthOther } from '@/pages/(components)/Auth'
import { Button } from '@/pages/(components)/Button'
import Auth from '@/pages/(partials)/Auth'

export default function Component() {
    return (
        <Auth title="Recover your password">
            <AuthInput type="Email" name="Email" text="Email" placeholder="email@example.com" match="" />
            <Button size="lg" className="w-full" variant="link" type="submit"> Reset password </Button>
            <AuthOther text="Don't have an account?" href="/auth/signup" hrefText="Sign up" />
        </Auth>
    );
}