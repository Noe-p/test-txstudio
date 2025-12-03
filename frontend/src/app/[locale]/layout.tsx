'use client';

import { AppProvider, useAppContext } from '@/contexts/AppContext';
import { messages } from '@/i18n/config';
import { QueryProvider } from '@/providers/QueryProvider';
import { IMAGE_FALLBACK } from '@/static/constants';
import { IntlProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { ReactNode, useEffect, useState } from 'react';
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
  const [timeZone, setTimeZone] = useState('UTC');
  const { logoUrl } = useAppContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, []);

  return (
    <html lang={'fr'} className={inter.variable}>
      <head>
        <link rel="icon" href={logoUrl ?? IMAGE_FALLBACK} type="image/webp" />
      </head>
      <body className="m-0 p-0">
        <IntlProvider timeZone={timeZone} messages={messages['fr']} locale={'fr'}>
          <QueryProvider>
            <AppProvider>{children}</AppProvider>
          </QueryProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
