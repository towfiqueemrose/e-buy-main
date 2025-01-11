'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton({ className = '' }) {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className={`bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors ${className}`}
    >
      Sign out
    </button>
  );
}