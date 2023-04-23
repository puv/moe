import { AppProps } from 'next/app';
import { ReactNode, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession, signOut, signIn } from 'next-auth/react';
import Application from '@/pages/index'

import '@/public/css/Style.css'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  if (isServer) return null;

  return (
    <SessionProvider session={session}>
      <Application />
      {/* <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </div> */}
    </SessionProvider>
  );
}
export default App;