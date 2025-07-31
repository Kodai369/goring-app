'use client';

import Link from 'next/link';

export default function Home() {
  const menus = [
    { name: '五輪アライメント', href: '/align', description: 'あなたの内的五輪のバランスを整える対話' },
    { name: 'フリートーク', href: '/free', description: '自由な対話を通じて気づきを得る場' },
    { name: 'ヒモリについて', href: '/himori', description: 'このプロジェクトの背景と哲学' },
    { name: 'ポリシー', href: '/privacy', description: '運営方針とプライバシーポリシー' },
  ];

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">五輪アライメントへようこそ</h1>
      <div className="grid gap-6 max-w-md mx-auto">
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href}>
            <div className="border border-black rounded-2xl p-6 hover:bg-black hover:text-white transition">
              <h2 className="text-lg font-semibold mb-2">{menu.name}</h2>
              <p className="text-sm">{menu.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
