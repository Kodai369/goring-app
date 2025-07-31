'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
      <h1
        onClick={() => router.push('/')}
        className="text-xl font-bold text-center text-black cursor-pointer hover:underline"
      >
        五輪アライメント
      </h1>
    </header>
  );
}
