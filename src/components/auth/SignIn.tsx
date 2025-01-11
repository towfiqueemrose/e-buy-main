'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <button 
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="bg-white rounded-full flex items-center justify-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
    >
      <Image 
        src="/google.svg"
        alt="Google Sign-In"
        width={40}
        height={40}
        className="mr-2"
      />
      <h1 className='text-xl font-semibold'>Sign in with Google</h1>
    </button>
  );
}