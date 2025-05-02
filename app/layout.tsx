

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ReduxProvider from './Provider';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SchooNet',
  description: 'Discover Your Child’s Ideal School in Ethiopia',
  icons: {
    icon: '/logo-white.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}