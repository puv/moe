import { TwoFactorAuth } from '@/src/components/Auth'
import Auth from '@/src/components/partials/Auth'

export default function Component() {
    return (
        <Auth title="Inpur your 2-FA Code">
            <TwoFactorAuth />
        </Auth>
    );
}