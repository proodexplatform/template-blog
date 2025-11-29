// components/MobileNav.tsx
'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/" onClick={toggleMenu}>Home</Link>
            <Link href="/blog" onClick={toggleMenu}>Blog</Link>
            <Link href="/contact" onClick={toggleMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </div>
  );
};