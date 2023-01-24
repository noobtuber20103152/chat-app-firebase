import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import ChatList from '@/components/chat-list'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, provider } from '@/firebase-config'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  // const [user, setuser] = useState(false);
  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
      });
      // console.log()
  };
  const router = useRouter();
  let user = useAuthState(auth)?.[0]
  if (!user) {
    return <>
      <div className='flex justify-center items-center h-[100vh]'>
        <button onClick={signin} type="button" class="text-white bg-[#4285F4]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
          <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Sign in with Google
        </button>
      </div>
    </>
  }
  else {
    return <>
      <ChatList />
    </>
  }


}
