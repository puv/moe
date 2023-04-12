import { AuthInput, AuthOther } from '@/pages/(components)/Auth'
import { Button } from '@/pages/(components)/Button'
import Auth from '@/pages/(partials)/Auth'

export default function Component() {
    return (
        <Auth title="Sign up for an account">
            <AuthInput type="text" name="Username" text="Username" placeholder="Username" match="" />
            <AuthInput type="Email" name="Email" text="Email" placeholder="email@example.com" match="" />
            <AuthInput type="Password" name="Password" text="Password" placeholder="********" match="" />
            <Button size="lg" className="w-full" variant="link" type="submit"> Sign Up </Button>
            <AuthOther text="Already have an account?" href="/auth/signin" hrefText="Sign in" />
        </Auth>
    );
}