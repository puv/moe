import { TwoFactorAuth } from '@/src/pages/components/Auth'
import Auth from '@/src/pages/components/partials/Auth'

export default function Component() {
    return (
        <Auth title="Inpur your 2-FA Code">
            <TwoFactorAuth />
        </Auth>
    );
}