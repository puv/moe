import { TwoFactorAuth } from '@/components/Auth'
import Auth from '@/components/partials/Auth'

export default function Component() {
    async function submitHandler(event: any) {
        event.preventDefault();
    }

    return (
        <Auth onSubmit={submitHandler} title="Inpur your 2-FA Code">
            <TwoFactorAuth />
        </Auth>
    );
}