import '@/styles/globals.css';
import React from "react";
import { ReactNode } from 'react';
import { Header } from '@/app/layouts/header';
import { Footer } from '@/app/layouts/footer';
import { Navigation } from '@/components/custom/navigation';
import { ThemeProvider } from '@/context/theme-provider';
import { ClientScriptHandler } from './clientScriptHandler';

// Optional metadata replaces <Head>
export const metadata = {
  title: 'My Next.js App',
  description: 'A modern portfolio site',
  icons: {
    icon: '/vite.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <div className="flex flex-col min-h-screen">
            <Header />
            <Navigation />
            <main className="flex-grow">
              <ClientScriptHandler />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};