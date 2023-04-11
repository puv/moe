import '/public/css/Style.css'
import Footer from './(partials)/Footer';
import Notifications from './(partials)/Notifications';
import Drawer from './(partials)/Drawer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '...',
  description: '...',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Drawer />
        <main style={{
          marginLeft: 14 + "rem"
        }} className='px-5'>
          {children}
        </main>
        <Footer />
        <Notifications />
      </body>
    </html>
  )
}


