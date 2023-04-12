import { AuthInput, RememberMe, AuthOther } from '@/pages/(components)/Auth'
import { Button } from '@/pages/(components)/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Component(props: any, {
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {props.title}
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    {children}
                    {/* <AuthInput type="Email" name="Email" text="Email" placeholder="email@example.com" match="" />
                    <AuthInput type="Password" name="Password" text="Password" placeholder="********" match="" />
                    <div className="flex items-center justify-between">
                        <RememberMe />
                        <Link to="/auth/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                    </div>
                    <Button size="lg" className="w-full" variant="link" type="submit"> Sign In </Button>
                    <AuthOther text="Don't have an account?" to="/auth/signup" toText="Sign up" /> */}
                </form>
            </div>
        </div>
    );
}