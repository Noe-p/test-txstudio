import { HomePage } from '@/components/pages/HomePage';
import { locales } from '@/i18n/config';
import { strapiApi } from '@/services/strapi/api';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page(): Promise<React.JSX.Element> {
  let headerData = null;
  let advantagesData = null;

  try {
    headerData = await strapiApi.header.get();
  } catch (error) {
    console.error('Failed to fetch header data:', error);
  }

  try {
    advantagesData = await strapiApi.advantages.getAll();
  } catch (error) {
    console.error('Failed to fetch advantages data:', error);
  }

  return <HomePage headerData={headerData} advantagesData={advantagesData} />;
}

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
