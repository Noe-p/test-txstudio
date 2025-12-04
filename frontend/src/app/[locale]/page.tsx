import { HomePage } from '@/components/pages/HomePage';
import { locales } from '@/i18n/config';
import { strapiApi } from '@/services/strapi/api';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page(): Promise<React.JSX.Element> {
  let homePageData = null;
  let configurationData = null;

  try {
    homePageData = await strapiApi.homePage.get();
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
  }
  try {
    configurationData = await strapiApi.configuration.get();
  } catch (error) {
    console.error('Failed to fetch configuration data:', error);
  }

  return (
    <HomePage
      headerData={homePageData?.Header || null}
      advantagesData={homePageData?.Advantage || null}
      servicesData={homePageData?.Service || null}
      configurationData={configurationData || null}
    />
  );
}

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
