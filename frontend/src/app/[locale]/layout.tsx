'use client';

import { AppProvider } from '@/contexts/AppContext';
import { messages } from '@/i18n/config';
import { IntlProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '../../static/styles/app.css';

const inter = Inter({
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <html lang={'fr'} className={inter.variable}>
      <head>
        <link rel="icon" href="/logo.webP" type="image/webp" />
      </head>
      <body className="m-0 p-0">
        <IntlProvider timeZone={timeZone} messages={messages['fr']} locale={'fr'}>
          <AppProvider>{children}</AppProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
