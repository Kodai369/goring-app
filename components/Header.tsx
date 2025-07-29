'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow p-4 sticky top-0 z-50">
      <nav className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">五輪バランシング</h1>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li><Link href="/">五輪アライメント</Link></li>
          <li><Link href="/free">フリートーク</Link></li>
          <li><Link href="/himori">ヒモリについて</Link></li>
          <li><Link href="/privacy">ポリシー</Link></li>
        </ul>
      </nav>
    </header>
  );
}
