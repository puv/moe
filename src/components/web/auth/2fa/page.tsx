import { TwoFactorAuth } from '@/components/Auth'
import Auth from '@/components/partials/Auth'

export default function Component() {
    return (
        <Auth title="Inpur your 2-FA Code">
            <TwoFactorAuth />
        </Auth>
    );
}