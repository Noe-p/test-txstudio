import { LoginPage } from '@/components/pages/LoginPage';
import { locales } from '@/i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page(): Promise<React.JSX.Element> {
  return <LoginPage />;
}

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
