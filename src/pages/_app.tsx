import { AppProps } from 'next/app';
import { ReactNode, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import '@/public/css/Style.css'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  if (isServer) return null;

  return (
    <SessionProvider session={session}>
      <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </div>
    </SessionProvider>

  );
  // This literally works why do I get error?
}
export default App;