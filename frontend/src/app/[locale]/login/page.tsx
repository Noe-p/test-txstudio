import { LoginPage } from '@/components/pages/LoginPage';
import { locales } from '@/i18n/config';
import { strapiApi } from '@/services/strapi/api';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page(): Promise<React.JSX.Element> {
  let configurationData = null;

  try {
    configurationData = await strapiApi.configuration.get();
  } catch (error) {
    console.error('Failed to fetch configuration data:', error);
  }

  return <LoginPage configurationData={configurationData} />;
}

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
