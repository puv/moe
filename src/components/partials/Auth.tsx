import { AuthInput, RememberMe, AuthOther } from '@/components/Auth'
import { Button } from '@/components/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Component({
    title,
    children,
}: {
    title: string,
    children: React.ReactNode
}) {
    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {title}
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    {children}
                </form>
            </div>
        </div>
    );
}