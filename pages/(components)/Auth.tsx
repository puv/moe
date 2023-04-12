import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export function AuthInput(props: any) {
    return (
        <div>
            <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.text}</label>
            <input type={props.type} name={props.name} id={props.name} placeholder={props.placeholder || ""} pattern={props.match || ""} required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    )
}

export function RememberMe() {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
            </div>
        </div>
    )
}

export function AuthOther(props: any) {
    return <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {props.text} <Link to={props.to} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{props.toText}</Link>
    </p>
}

export function TwoFactorAuth() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <input type="tel" name="pincode-1" maxLength={1} pattern="[\d]*" tabIndex={1} placeholder="" autoComplete="off" />
            <input type="tel" name="pincode-1" maxLength={1} pattern="[\d]*" tabIndex={2} placeholder="" autoComplete="off" />
            <input type="tel" name="pincode-1" maxLength={1} pattern="[\d]*" tabIndex={3} placeholder="" autoComplete="off" />
            <input type="tel" name="pincode-1" maxLength={1} pattern="[\d]*" tabIndex={4} placeholder="" autoComplete="off" />
            <input type="tel" name="pincode-1" maxLength={1} pattern="[\d]*" tabIndex={5} placeholder="" autoComplete="off" />
            <input type="tel" name="pincode-1" maxLength={1} pattern="[\d]*" tabIndex={6} placeholder="" autoComplete="off" />
        </div>
    )
}