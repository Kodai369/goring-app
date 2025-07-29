import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "五輪バランシング",
  description: "五輪思想をもとにした自己調整アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"><body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}><Header /><main className="p-4 max-w-4xl mx-auto">{children}</main></body></html>
  );
}
