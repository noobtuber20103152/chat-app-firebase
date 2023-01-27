import { auth, db } from '@/firebase-config';
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// useEffect
export default function App({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if(!router){
      router.push("/")
    }
  }, [user])
  
  return <>
    <Component {...pageProps} />
    <Analytics />
  </>
}
