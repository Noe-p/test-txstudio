'use client';

import { AppProvider } from '@/contexts/AppContext';
import { messages } from '@/i18n/config';
import { IntlProvider } from 'next-intl';
import { Darker_Grotesque, Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
import '../../static/styles/app.css';

const title = Darker_Grotesque({
  display: 'swap',
  variable: '--font-title',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  subsets: ['latin'],
});

const text = Montserrat({
  display: 'swap',
  variable: '--font-text',
  weight: ['400', '700'],
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <html lang={'fr'} className={`${title.variable} ${text.variable}`}>
      <body>
        <IntlProvider timeZone={timeZone} messages={messages['fr']} locale={'fr'}>
          <AppProvider>{children}</AppProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
