"use client";

import './globals.css';
import Navbar from './components/navbar';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navbar on login and sign-in pages
  const showNavbar = !pathname?.includes('/login') && !pathname?.includes('/signin');

  // Adjust padding based on navbar visibility
  const mainClass = showNavbar ? 'min-h-screen pt-12' : 'min-h-screen';

  return (
    <html lang="en">
      <body>
        {showNavbar && <Navbar />}
        <main className={mainClass}>{children}</main>
      </body>
    </html>
  );
}