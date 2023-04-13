import { TwoFactorAuth } from '@/pages/(components)/Auth'
import Auth from '@/pages/(components)/partials/Auth'

export default function Component() {
    return (
        <Auth title="Inpur your 2-FA Code">
            <TwoFactorAuth />
        </Auth>
    );
}