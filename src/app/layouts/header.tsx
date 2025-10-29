// components/Header.tsx
import Link from 'next/link';
import { MobileNav } from './mobile-nav';

export function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-gray-950">
      <Link href="/" className="text-xl font-semibold">
        <span>MyBlog</span>
      </Link>
      <nav className="hidden md:flex space-x-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <MobileNav />
    </header>
  );
};